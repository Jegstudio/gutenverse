
import apiFetch from '@wordpress/api-fetch';
import { applyFilters } from '@wordpress/hooks';
import { addQueryArgs } from '@wordpress/url';

export const getDemo = (param) => new Promise(resolve => {
    const { theme_slug } = window.GutenverseWizard;
    apiFetch({
        path: 'gutenverse-companion/v1/demo/get',
        method: 'POST',
        data: applyFilters(
            'gutenverse.library.import.parameter',
            {
                theme_slug,
                ...param
            }
        )
    }).then((data) => {
        resolve(data);
    }).catch((e) => {
        alert(e.message);
        resolve([]);
    });
});

export const getBaseTheme = (param) => new Promise(resolve => {
    apiFetch({
        path: 'gutenverse-client/v1/base-theme/get',
        method: 'POST',
        data: applyFilters(
            'gutenverse.library.import.parameter',
            {
                ...param
            }
        )
    }).then((data) => {
        resolve(data);
    }).catch((e) => {
        alert(e.message);
        resolve([]);
    });
});

export const licenseCheck = (param) => new Promise(resolve => {
    apiFetch({
        path: 'gutenverse-client/v1/check/license',
        method: 'POST',
        data: param
    }).then((data) => {
        resolve(data);
        return data;
    }).catch((e) => {
        alert(e.message);
        resolve([]);
    });
});

export const requirementCheck = (param) => new Promise(resolve => {
    apiFetch({
        path: 'gutenverse-client/v1/check/requirement',
        method: 'POST',
        data: param
    }).then((data) => {
        resolve(data);
        return data;
    }).catch((e) => {
        alert(e.message);
        resolve([]);
    });
});

export const formatArray = (arr) => {
    if (!arr) {
        return '';
    }
    const len = arr.length;
    if (len === 0) return '';
    if (len === 1) return arr[0].toString().charAt(0).toUpperCase() + arr[0].slice(1);
    if (len === 2) return arr[0].charAt(0).toUpperCase() + arr[0].slice(1) + ', or ' + arr[1].charAt(0).toUpperCase() + arr[1].slice(1);

    const last = arr[len - 1].toString().charAt(0).toUpperCase() + arr[len - 1].slice(1);
    let rest = arr.slice(0, len - 1);
    rest = rest.map(el => {
        return el.charAt(0).toUpperCase() + el.slice(1);
    });
    return rest.join(', ') + ', or ' + last;
};


export const removingPrevious = (template, active) => {
    return new Promise((resolve) => {
        apiFetch({
            path: 'gutenverse-companion/v1/demo/remove',
            method: 'POST',
            data: applyFilters(
                'gutenverse.library.import.parameter',
                {
                    name: template.title,
                    demo_id: template?.demo_id,
                    installed: template?.status?.exists,
                    active: active?.title
                }
            )
        }).then(() => {
            resolve();
        }).catch((e) => {
            resolve();
            console.error('Error During Uninstalling Current Demo', e);
        });
    });
};

export const installingPlugins = (template, setImporterStatus) => {
    return new Promise((resolve) => {

        const { plugin_list: installedPlugin } = window['GutenverseWizard'];
        const pluginsList = [
            {
                slug: 'gutenverse',
                name: 'Gutenverse',
                version: template.gutenverse,
                url: ''
            },
            ...template?.requirements,
        ];

        const plugins = pluginsList.map(plgn => ({
            name: plgn.name,
            slug: plgn.slug,
            version: plgn.version,
            url: plgn.url,
            installed: !!installedPlugin[plgn.slug],
            active: !!installedPlugin[plgn.slug]?.active,
        }));

        setTimeout(() => {
            const installPlugins = (index = 0) => {
                if (index >= plugins.length) {
                    resolve(); // ✅ Done
                }

                const plugin = plugins[index];
                if (plugin) {
                    setImporterStatus(`Installing ${plugin.name} Plugin...`);

                    // Not installed
                    if (!plugin.installed) {
                        apiFetch({
                            path: 'wp/v2/plugins',
                            method: 'POST',
                            data: {
                                slug: plugin.slug,
                                status: 'active'
                            }
                        })
                            .then(() => {
                                setTimeout(() => installPlugins(index + 1), 1500);
                            })
                            .catch(err => {
                                //reject(err); // ❌ Stop chain on failure
                                setTimeout(() => installPlugins(index + 1), 1500);
                            });

                        // Installed but not active
                    } else if (!plugin.active) {
                        apiFetch({
                            path: `wp/v2/plugins/plugin?plugin=${plugin.slug}/${plugin.slug}`,
                            method: 'POST',
                            data: { status: 'active' }
                        })
                            .then(() => {
                                setTimeout(() => installPlugins(index + 1), 1500);
                            })
                            .catch(() => {
                                // reject(err); // ❌ Stop chain on failure
                                setTimeout(() => installPlugins(index + 1), 1500);
                            });

                        // Already installed & active
                    } else {
                        setTimeout(() => installPlugins(index + 1), 1500);
                    }
                }

            };

            installPlugins();
        }, 500);
    });
};

export const fetchingDataImport = (template, active) => {
    return new Promise((resolve) => {
        apiFetch({
            path: 'gutenverse-companion/v1/demo/import',
            method: 'POST',
            data: applyFilters(
                'gutenverse.library.import.parameter',
                {
                    name: template.title,
                    demo_id: template?.demo_id,
                    installed: template?.status?.exists,
                    active: active?.title
                }
            )
        }).then(() => {
            resolve();
        }).catch((e) => {
            resolve();
            console.error('Error During Fetching Data', e);
        });
    });
};

export const importingPatterns = (template, misc, setImporterStatus) => {
    return new Promise((resolve) => {
        apiFetch({
            path: addQueryArgs('gutenverse-companion/v1/pattern/get'),
            method: 'POST',
            data: {
                template: template.title,
            }
        }).then((data) => {
            return importingPattern(data, [], template, misc, setImporterStatus);
        }).then(() => {
            resolve();
        }).catch(() => {
            return importingPattern([], [], template, misc, setImporterStatus);
        }).then(() => {
            resolve(); // ✅ Done
        }).catch(err => {
            console.error('Error during pattern import:', err);
            // reject(err); // ❌ Let it bubble up
            resolve();
        });
    });
};

export const importingPattern = (patterns, installed, template, misc, setImporterStatus) => {
    return new Promise((resolveOuter) => {
        const patternKeys = Object.keys(patterns);

        const importNext = (index) => {
            if (index >= patternKeys.length) {
                return resolveOuter(
                    {
                        installed: installed
                    }
                );
            }

            const patternKey = patternKeys[index];
            const pattern = patterns[patternKey];

            setImporterStatus(`Importing ${pattern.title} Patterns...`);

            const arrImages = [];
            const imagesRaw = pattern.images;
            const images = Array.isArray(imagesRaw)
                ? imagesRaw
                : Object.values(imagesRaw || {});

            const placeholderPath = '/lib/framework/assets/img/img-placeholder.jpg';
            const { plugins_url } = window['GutenverseWizard'];

            const processImages = images.reduce((promiseChain, image) => {
                return promiseChain.then(() => {
                    if (image.includes(placeholderPath)) {
                        arrImages.push(`${plugins_url}/gutenverse${placeholderPath}`);
                        return Promise.resolve();
                    }

                    return apiFetch({
                        path: 'gutenverse-companion/v1/import/images',
                        method: 'POST',
                        data: { imageUrl: image }
                    })
                        .then(response => {
                            arrImages.push(response.url);
                        })
                        .catch(error => {
                            console.error('Image import failed:', error);
                            arrImages.push('');
                        });
                });
            }, Promise.resolve());

            processImages
                .then(() => {
                    let content = pattern.content.replace(/\\u([\dA-F]{4})/gi, (match, grp) => {
                        return String.fromCharCode(parseInt(grp, 16));
                    });

                    arrImages.forEach((id, idx) => {
                        const regex = new RegExp(`\\{\\{\\{image:${idx}:url\\}\\}\\}`, 'g');
                        content = content.replace(regex, id);
                    });

                    // const additional = misc.reduce((acc, key) => {
                    //     const mappedKey = key === 'acf-data' ? 'acf' : key === 'post-demo' ? 'post' : null;
                    //     if (mappedKey) {
                    //         const data = pattern?.misc?.[mappedKey] || null;
                    //         acc.push({ [key]: data });
                    //     }
                    //     return acc;
                    // }, []);

                    const additional = [];
                    return apiFetch({
                        path: 'gutenverse-companion/v1/pattern/insert',
                        method: 'POST',
                        data: {
                            content,
                            slug: pattern.pattern_slug,
                            title: pattern.title,
                            additional: JSON.stringify(additional),
                            sync: pattern.is_sync,
                            demo_slug: template.title
                        },
                        headers: {
                            'X-WP-Admin': true,
                        },
                    });
                })
                .then(response => {
                    if (response?.slug && response?.id) {
                        installed.push({ [response.slug]: response.id });
                    }
                    importNext(index + 1);
                })
                .catch(error => {
                    console.error(`Error When Importing Pattern ${pattern.title}:`, error);
                    importNext(index + 1); // continue with next even on error
                });
        };

        importNext(0); // start the chain
    });
};

export const assignTemplates = (installed, template) => {
    return new Promise((resolve) => {
        apiFetch({
            path: 'gutenverse-companion/v1/demo/assign',
            method: 'POST',
            data: {
                template: template.title,
                pattern: installed
            }
        }).then(() => {
            resolve(installed);
            return;
        }).catch(() => {
            resolve();
            console.error('Assigning Template Failed!');
            return;
        });
    });
};

export const importPages = (installed, template, misc) => {
    return new Promise((resolve) => {
        apiFetch({
            path: 'gutenverse-companion/v1/demo/pages',
            method: 'POST',
            data: {
                template: template.title,
                pattern: installed,
                misc: misc[0]
            }
        }).then(() => {
            resolve();
            return;
        }).catch(() => {
            resolve();
            console.error('Importing Page Failed!');
            return;
        });
    });
};

export const importMenus = (template, misc) => {
    return new Promise((resolve) => {
        apiFetch({
            path: 'gutenverse-companion/v1/import/menus',
            method: 'POST',
            data: {
                template: template.title,
                misc: misc[0]
            }
        }).then(() => {
            resolve();
        }).catch(() => {
            resolve();
            console.error('Importing Menu Failed!');
            return;
        });
    });
};