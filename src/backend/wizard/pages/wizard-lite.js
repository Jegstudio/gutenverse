import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useRef, useState } from '@wordpress/element';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { Check } from 'react-feather';
import apiFetch from '@wordpress/api-fetch';
import { ChevronLeftSVG, ChevronRightSVG, IconEngageResultSVG, IconLimitlessDesignSVG, IconPauseSVG, IconPlaySVG, IconStarSVG, IconWorkFasterSVG } from '../icons';

const ImportLoading = (props) => {
    let progress = '0%';
    const width = () => {
        switch (props?.progress) {
            case '1/4':
                progress = '25%';
                return 'twenty-five';
            case '2/4':
                progress = '50%';
                return 'fifty';
            case '3/4':
                progress = '75%';
                return 'seventy-five';
            case '4/4':
                progress = '100%';
                return 'hundred';
            default:
                progress = '0%';
                return 'zero';
        }
    };

    width();

    return <div className="installing-notice">
        <div className="installing-notice-container">
            <div className="importing-notice">
                <div className="notice-inner">
                    <span>{props?.message}</span>
                    <span>{progress}</span>
                </div>
                <div className="bar-progress-container">
                    <div className={'notice-bar-progress ' + `${width()}-percent`} />
                </div>
            </div>
        </div>
    </div>;
};

const InstallPlugin = ({ action, setAction, updateProgress }) => {
    const { plugins } = window['GutenThemeConfig'];
    const [installing, setInstalling] = useState({ show: true, message: 'Preparing...', progress: '1/4' });
    useEffect(() => {
        let allActive = true;
        plugins?.map(plugin => {
            allActive = allActive && plugin?.active;
        });

        if (allActive) {
            setAction('done');
        }
    }, []);

    const boldWord = (str, word) => {
        const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedWord}\\b`, 'gi');
        const parts = str.split(regex);
        const matches = str.match(regex);

        return parts.map((part, index) => (
            <Fragment key={index}>
                {part}
                {index < matches?.length ? <span className="gutenverse">{matches[index]}</span> : null}
            </Fragment>
        ));
    };

    const installPlugins = (index = 0) => {
        if (plugins && index < plugins.length) {
            setTimeout(() => {
                setInstalling({ show: true, message: 'Installing Plugins...', progress: '2/4' });
                const plugin = plugins[index];
                if (!plugin?.installed) {
                    if (plugin?.download_url) {
                        apiFetch({
                            path: 'gtb-themes-backend/v1/install/plugins',
                            method: 'POST',
                            data: {
                                slug: plugin?.slug,
                                download_url: plugin?.download_url
                            }
                        }).then((res) => {
                            if ('success' === res.status) {
                                apiFetch({
                                    path: `wp/v2/plugins/plugin?plugin=${plugin?.slug}/${plugin?.slug}`,
                                    method: 'POST',
                                    data: {
                                        status: 'active'
                                    }
                                }).then(() => {
                                    installPlugins(index + 1);
                                }).catch(() => {
                                    alert('Error during plugin activation');
                                    installPlugins(index + 1);
                                });
                            } else {
                                alert(res.message);
                                installPlugins(index + 1);
                            }
                        });
                    } else {
                        apiFetch({
                            path: 'wp/v2/plugins',
                            method: 'POST',
                            data: {
                                slug: plugin?.slug,
                                status: 'active'
                            },
                        }).then(() => {
                            installPlugins(index + 1);
                        }).catch(() => {
                            alert('Error during plugin activation');
                            installPlugins(index + 1);
                        });
                    }
                } else if (!plugin?.active) {
                    apiFetch({
                        path: `wp/v2/plugins/plugin?plugin=${plugin?.slug}/${plugin?.slug}`,
                        method: 'POST',
                        data: {
                            status: 'active'
                        }
                    }).then(() => {
                        installPlugins(index + 1);
                    }).catch(() => {
                        alert('Error during plugin activation');
                        installPlugins(index + 1);
                    });
                } else {
                    installPlugins(index + 1);
                }
            }, 500);
        } else {
            setInstalling({ show: true, message: 'Installing Complete', progress: '4/4' });
            setTimeout(() => {
                setAction('done');
            }, 500);
        }
    };

    const onInstall = () => {
        setAction('loading');
        installPlugins(0);
    };

    const pluginActions = () => {
        switch (action) {
            case 'done':
                return <Fragment>
                    <div className="button-done">{__('Installed & Activated', 'gutenverse-companion')}</div>
                    <div onClick={() => updateProgress('upgradePro', 1)} className="button-next">{__('Next', 'gutenverse-companion')}</div>
                </Fragment>;
            case 'loading':
                return <Fragment>
                    <ImportLoading message={installing?.message} progress={installing?.progress} />
                </Fragment>;
            case 'install':
            default:
                return <Fragment>
                    <div onClick={() => onInstall()} className="button-install">{__('Install Required Plugins', 'gutenverse-companion')}</div>
                </Fragment>;
        }
    };

    return <div className="plugin-install">
        <h1 className="content-title">{__('Install Required Plugins', 'gutenverse-companion')}</h1>
        <p className="content-desc">{__('To access the full range of theme features, please install and activate the required plugins. Your enhanced user experience is just a few steps away!', 'gutenverse-companion')}</p>
        <div className="plugin-list">
            {plugins?.map((plugin, key) => {
                return <div className={`plugin-data ${plugin.active && 'active'}`} key={key}>
                    <div className="logo">
                        {plugin?.icons && plugin?.icons['1x'] && <img src={plugin?.icons['1x']} />}
                    </div>
                    <div className="plugin-detail">
                        <h3 className="plugin-title">{boldWord(plugin?.title, 'Gutenverse')}</h3>
                        <p className="plugin-desc">{plugin?.short_desc.toLowerCase()}</p>
                    </div>
                    {plugin.active && <div className="active-badge">Installed</div>}
                </div>;
            })}
        </div>
        <div className="plugin-actions">
            {pluginActions()}
        </div>
    </div>;
};

const UpgradePro = ({ updateProgress }) => {
    const [playing, setPlaying] = useState(true);
    const splideRef = useRef();
    const barsFill = useRef([]);
    const bars = useRef([]);
    const pause = useRef([]);
    const { upgradePro, pro_preview, pro_title } = window['GutenThemeConfig'];
    const { gutenverseImgDir : images } = window['GutenverseWizard'];

    const animations = {
        slideInUp: 'slide-up',
        slideInLeft: 'slide-left',
        slideInRight: 'slide-right',
        slideInDown: 'slide-down',
        scaleIn: 'scale-in',
        rotateCw: 'rotate-cw',
        rotateCcw: 'rotate-ccw',
        slideInUpThumbnail: 'slide-up-thumbnail',
    };

    const togglePause = () => {
        const autoplay = splideRef?.current?.splide?.Components?.Autoplay;

        if (!autoplay) return;

        if (autoplay.isPaused()) {
            autoplay.play();
            setPlaying(true);
        } else {
            autoplay.pause();
            setPlaying(false);
        }
    };

    useEffect(() => {
        if (splideRef.current) {
            const splideInstance = splideRef.current.splide;
            const totalSlides = splideInstance.length - 1;

            barsFill.current = document.querySelectorAll('.slider-wrapper .progress-bar-fill');
            bars.current = document.querySelectorAll('.slider-wrapper .progress-bar');
            pause.current = document.querySelectorAll('.slider-wrapper .splide-autoplay-controls .splide-toggle-div');

            if (bars.current[0]) {
                bars.current[0].classList.add('is-done');
            }

            const runAnimation = () => {
                Object.entries(animations).forEach(([key, value]) => {
                    const currentImg = document.querySelectorAll('.slider-wrapper li.is-active .' + key);
                    currentImg.forEach(el => {
                        el.classList.remove(key);
                        el.classList.add(value);
                    });

                    const prevImg = document.querySelectorAll('.slider-wrapper li.is-prev .' + value);
                    prevImg.forEach(el => {
                        el.classList.remove(value);
                        el.classList.add(key);
                    });

                    const nextImg = document.querySelectorAll('.slider-wrapper li.is-next .' + value);
                    nextImg.forEach(el => {
                        el.classList.remove(value);
                        el.classList.add(key);
                    });
                });
            };

            runAnimation();

            splideInstance.on('moved', () => {
                runAnimation();
            });

            splideInstance.on('autoplay:playing', (rate) => {
                const index = splideInstance.index;
                if (barsFill.current[index]) {
                    barsFill.current[index].style.width = `${rate * 100}%`;

                    if (index === totalSlides && rate > 0.99) {
                        barsFill.current[index].style.width = '100%';
                        splideInstance.Components.Autoplay.pause();
                    } else {
                        barsFill.current[index].style.width = `${rate * 100}%`;
                    }
                }
            });

            splideInstance.on('move', (newIndex, prevIndex) => {
                if (barsFill.current[prevIndex]) {
                    if (newIndex < prevIndex) {
                        barsFill.current[prevIndex].style.width = '0%';
                    } else {
                        barsFill.current[prevIndex].style.width = '100%';
                    }
                }

                if (prevIndex > newIndex) {
                    bars.current[prevIndex].classList.remove('is-done');
                }
                if (bars.current[newIndex]) {
                    bars.current[newIndex].classList.add('is-done');
                }

                if (newIndex < totalSlides && splideInstance.Components.Autoplay.isPaused()) {
                    splideInstance.Components.Autoplay.play();
                    setPlaying(true);
                }
            });

            return () => {
                if (splideInstance) {
                    splideInstance.off('autoplay:playing');
                    splideInstance.off('moved');
                }
            };
        }
    }, []);

    return <div className="upgrade-pro-wrapper">
        <div className="slider-wrapper">
            <Splide
                ref={splideRef}
                aria-label="My Favorite Images"
                hasTrack={false}
                options={{
                    width: '860px',
                    height: '460px',
                    gap: '1rem',
                    interval: 5000,
                    autoplay: true,
                    pagination: false,
                    pauseOnHover: false,
                    pauseOnFocus: false,
                    resetProgress: false,
                }}>
                <SplideTrack>
                    <SplideSlide>
                        <div className="upgrade-pro-content">
                            <div className="content-left">
                                <h3 className="content-title">
                                    {__('Get ', 'gutenverse-companion')}{pro_title}
                                </h3>
                                <p className="content-desc">
                                    {__('Unlock ' + pro_title + ' and gain access to 50+ other premium niche themes, full access to all advanced Pro features by upgrading to a Gutenverse Professional license or higher.', 'gutenverse-companion')}
                                </p>
                                <ul className="content-list">
                                    <li>
                                        <div className="circle"><Check size={12} /></div>
                                        <span>{__('Unlock ', 'gutenverse-companion')}<b>{__('1000+', 'gutenverse-companion')}</b>{__(' Template Library', 'gutenverse-companion')}</span>
                                    </li>
                                    <li>
                                        <div className="circle"><Check size={12} /></div>
                                        <span>{__('Unlock ', 'gutenverse-companion')}<b>{__('50+', 'gutenverse-companion')}</b>{__(' Premium Niche Themes', 'gutenverse-companion')}</span>
                                    </li>
                                    <li>
                                        <div className="circle"><Check size={12} /></div>
                                        <span>{__('Unlock ', 'gutenverse-companion')}<b>{__('100+', 'gutenverse-companion')}</b>{__(' Advanced Blocks', 'gutenverse-companion')}</span>
                                    </li>
                                    <li>
                                        <div className="circle"><Check size={12} /></div>
                                        <span>{__('Unlock ', 'gutenverse-companion')}<b>{__('1000+', 'gutenverse-companion')}</b>{__(' Icons Selector', 'gutenverse-companion')}</span>
                                    </li>
                                </ul>
                                <div className="upgrade-pro-button" onClick={() => window.open(upgradePro, '_blank')}>
                                    <div className="button-content-wrapper">
                                        <span>{__('Upgrade To PRO', 'gutenverse-companion')}</span>
                                        <svg width={16} height={16} viewBox="0 0 15 15" fill={'white'} transform={'translate(0,0)'} xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.25 9.5L2 2.625L5.4375 5.75L7.625 2L9.8125 5.75L13.25 2.625L12 9.5H3.25ZM12 11.375C12 11.75 11.75 12 11.375 12H3.875C3.5 12 3.25 11.75 3.25 11.375V10.75H12V11.375Z" fill={'white'} />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="content-right plus-theme">
                                <img className="background" src={images + '/wizard-background-circle.png'} />
                                <img className="positioned slideInUpThumbnail" src={pro_preview} style={{ maxWidth: '95%', top: '10px', marginLeft: '10px', marginRight: '10px', zIndex: '5' }} />
                                <div className="thumbnail-overlay"></div>
                            </div>
                            <div className="splide-autoplay-controls">
                                <div className="splide-toggle-div plus-theme" onClick={togglePause}>
                                    {playing ? <IconPauseSVG /> : <IconPlaySVG />}
                                </div>
                            </div>
                        </div>
                    </SplideSlide>
                    <SplideSlide>
                        <div className="upgrade-pro-content">
                            <div className="content-left">
                                <h3 className="content-title">
                                    {__('Design Without Limits', 'gutenverse-companion')}
                                </h3>
                                <p className="content-desc">
                                    {__('Unlock unlimited creative possibilities and craft a truly stunning website experience.', 'gutenverse-companion')}
                                </p>
                                <div className="column">
                                    <ul className="content-list">
                                        <li>
                                            <div className="circle"><Check size={12} /></div>
                                            <span>{__('Advanced Animation Effects.', 'gutenverse-companion')}</span>
                                        </li>
                                        <li>
                                            <div className="circle"><Check size={12} /></div>
                                            <span>{__('Transform.', 'gutenverse-companion')}</span>
                                        </li>
                                        <li>
                                            <div className="circle"><Check size={12} /></div>
                                            <span>{__('Text Clip.', 'gutenverse-companion')}</span>
                                        </li>
                                        <li>
                                            <div className="circle"><Check size={12} /></div>
                                            <span>{__('Highlight Styles.', 'gutenverse-companion')}</span>
                                        </li>
                                    </ul>
                                    <ul className="content-list">
                                        <li>
                                            <div className="circle"><Check size={12} /></div>
                                            <span>{__('Animated Shape Dividers.', 'gutenverse-companion')}</span>
                                        </li>
                                        <li>
                                            <div className="circle"><Check size={12} /></div>
                                            <span>{__('Mouse Move Effect.', 'gutenverse-companion')}</span>
                                        </li>
                                        <li>
                                            <div className="circle"><Check size={12} /></div>
                                            <span>{__('Fluid Background.', 'gutenverse-companion')}</span>
                                        </li>
                                        <li>
                                            <div className="circle"><Check size={12} /></div>
                                            <span>{__('Background Effects.', 'gutenverse-companion')}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="upgrade-pro-button" onClick={() => window.open(upgradePro, '_blank')}>
                                    <div className="button-content-wrapper">
                                        <span>{__('Upgrade To PRO', 'gutenverse-companion')}</span>
                                        <svg width={16} height={16} viewBox="0 0 15 15" fill={'white'} transform={'translate(0,0)'} xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.25 9.5L2 2.625L5.4375 5.75L7.625 2L9.8125 5.75L13.25 2.625L12 9.5H3.25ZM12 11.375C12 11.75 11.75 12 11.375 12H3.875C3.5 12 3.25 11.75 3.25 11.375V10.75H12V11.375Z" fill={'white'} />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="content-right">
                                <img className="background" src={images + '/wizard-background-circle.png'} />
                                <img className="positioned rotateCw slideInUp" src={images + '/limitless-design-mockup-arrow-animation.png'} style={{ width: '50px', top: '190px', left: '35px', zIndex: '9' }} />
                                <img className="positioned slideInUp" src={images + '/limitless-design-mockup-animation-wizard.png'} style={{ width: '200px', top: '205px', left: '90px' }} />
                                <img className="positioned slideInUp" src={images + '/limitless-design-mockup-blink.png'} style={{ width: '20px', top: '330px', right: '160px', animationDelay: '0.1s' }} />
                                <img className="positioned scaleIn" src={images + '/limitless-design-mockup-icon-animation.png'} style={{ width: '25px', top: '100px', left: '50px' }} />
                                <img className="positioned scaleIn" src={images + '/limitless-design-mockup-icon-star.png'} style={{ width: '25px', top: '60px', left: '100px', animationDelay: '0.2s' }} />
                                <img className="positioned slideInRight" src={images + '/limitless-design-mockup-fade-animation.png'} style={{ width: '80px', top: '130px', right: '10px' }} />
                                <img className="positioned slideInLeft" src={images + '/limitless-design-mockup-move-animation.png'} style={{ width: '80px', top: '295px', left: '85px', animationDelay: '0.2s' }} />
                                <img className="positioned slideInRight" src={images + '/limitless-design-mockup-animation-star.png'} style={{ width: '150px', top: '295px', right: '-65px', zIndex: '9' }} />
                            </div>
                            <div className="splide-autoplay-controls">
                                <div className="splide-toggle-div" onClick={togglePause}>
                                    {playing ? <IconPauseSVG /> : <IconPlaySVG />}
                                </div>
                            </div>
                        </div>
                    </SplideSlide>
                    <SplideSlide>
                        <div className="upgrade-pro-content">
                            <div className="content-left">
                                <h3 className="content-title">
                                    {__('Engage Visitors, Drive Results', 'gutenverse-companion')}
                                </h3>
                                <p className="content-desc">
                                    {__('Turn your website into a lead-generation machine and keep your audience engaged.', 'gutenverse-companion')}
                                </p>
                                <ul className="content-list">
                                    <li>
                                        <div className="circle"><Check size={12} /></div>
                                        <span>{__('Gutenverse Form.', 'gutenverse-companion')}</span>
                                    </li>
                                    <li>
                                        <div className="circle"><Check size={12} /></div>
                                        <span>{__('Gutenverse Popup.', 'gutenverse-companion')}</span>
                                    </li>
                                    <li>
                                        <div className="circle"><Check size={12} /></div>
                                        <span>{__('Gutenverse News.', 'gutenverse-companion')}</span>
                                    </li>
                                </ul>
                                <div className="upgrade-pro-button" onClick={() => window.open(upgradePro, '_blank')}>
                                    <div className="button-content-wrapper">
                                        <span>{__('Upgrade To PRO', 'gutenverse-companion')}</span>
                                        <svg width={16} height={16} viewBox="0 0 15 15" fill={'white'} transform={'translate(0,0)'} xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.25 9.5L2 2.625L5.4375 5.75L7.625 2L9.8125 5.75L13.25 2.625L12 9.5H3.25ZM12 11.375C12 11.75 11.75 12 11.375 12H3.875C3.5 12 3.25 11.75 3.25 11.375V10.75H12V11.375Z" fill={'white'} />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="content-right">
                                <img className="background" src={images + '/wizard-background-circle.png'} />
                                <img className="positioned scaleIn" src={images + '/engage-result-mockup-gutenverse-form.png'} style={{ width: '170px', top: '40px', left: '110px', zIndex: '99' }} />
                                <img className="positioned scaleIn" src={images + '/engage-result-mockup-gutenverse-popup.png'} style={{ width: '170px', top: '175px', left: '15px', zIndex: '99', animationDelay: '0.2s' }} />
                                <img className="positioned scaleIn" src={images + '/engage-result-mockup-gutenverse-news.png'} style={{ width: '170px', top: '230px', right: '15px', zIndex: '99', animationDelay: '0.4s' }} />
                            </div>
                            <div className="splide-autoplay-controls">
                                <div className="splide-toggle-div" onClick={togglePause}>
                                    {playing ? <IconPauseSVG /> : <IconPlaySVG />}
                                </div>
                            </div>
                        </div>
                    </SplideSlide>
                    <SplideSlide>
                        <div className="upgrade-pro-content">
                            <div className="content-left">
                                <h3 className="content-title">
                                    {__('Why Upgrade to PRO?', 'gutenverse-companion')}
                                </h3>
                                <p className="content-desc">
                                    {__('With', 'gutenverse-companion')}<b>{__(' Gutenverse PRO', 'gutenverse-companion')}</b>{__(' you\'re not just unlocking extra features—you\'re unlocking freedom. Freedom to design faster. Freedom to be more creative. Freedom to engage your audience at a whole new level.', 'gutenverse-companion')}
                                </p>
                                <p className="content-desc bold">
                                    {__('Ready to take your website to the next stage?', 'gutenverse-companion')}
                                </p>
                                <div className="upgrade-pro-button" onClick={() => window.open(upgradePro, '_blank')}>
                                    <div className="button-content-wrapper">
                                        <span>{__('Upgrade To PRO', 'gutenverse-companion')}</span>
                                        <svg width={16} height={16} viewBox="0 0 15 15" fill={'white'} transform={'translate(0,0)'} xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.25 9.5L2 2.625L5.4375 5.75L7.625 2L9.8125 5.75L13.25 2.625L12 9.5H3.25ZM12 11.375C12 11.75 11.75 12 11.375 12H3.875C3.5 12 3.25 11.75 3.25 11.375V10.75H12V11.375Z" fill={'white'} />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flexible-container-arrow" >
                                    <svg width="75" height="66" viewBox="0 0 81 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.14771 51.5482C55.9057 58.3778 90.3609 32.8459 66.1666 10.5624" stroke="url(#paint0_linear_24721_12165)" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M9.61444 48.8749L6.32684 51.5726L8.69361 55.3227" stroke="#3B57F7" strokeWidth="1.5" strokeLinecap="round" />
                                        <defs>
                                            <linearGradient id="paint0_linear_24721_12165" x1="30.6503" y1="51.7548" x2="43.9983" y2="4.05337" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#3B57F7" />
                                                <stop offset="1" stopColor="#3B57F7" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <div className="content-right">
                                <img className="background" src={images + '/wizard-background-circle.png'} />
                                <img className="positioned slideInUp" src={images + '/upgrade-pro-mockup-frame-pro.png'} style={{ width: '300px', top: '230px', left: '40px', zIndex: '2' }} />
                                <img className="positioned slideInRight" src={images + '/upgrade-pro-mockup-cube-gutenverse.png'} style={{ width: '160px', top: '250px', right: '-70px', zIndex: '99', animationDelay: '0.1s' }} />
                                <img className="positioned scaleIn" src={images + '/upgrade-pro-mockup-icon-lottie.png'} style={{ width: '50px', top: '280px', left: '30px', animationDelay: '0.4s' }} />
                                <img className="positioned scaleIn" src={images + '/upgrade-pro-mockup-icon-megamenu.png'} style={{ width: '50px', top: '90px', right: '40px', animationDelay: '0.3s' }} />
                                <img className="positioned scaleIn" src={images + '/upgrade-pro-mockup-icon-text-marquee.png'} style={{ width: '50px', top: '100px', left: '30px', animationDelay: '0.2s' }} />
                            </div>
                            <div className="splide-autoplay-controls">
                                <div className="splide-toggle-div" onClick={togglePause}>
                                    {playing ? <IconPauseSVG /> : <IconPlaySVG />}
                                </div>
                            </div>
                        </div>
                    </SplideSlide>
                </SplideTrack>
                <div className="splide__arrows">
                    <button className="splide__arrow splide__arrow--prev"><ChevronLeftSVG /></button>
                    <button className="splide__arrow splide__arrow--next"><ChevronRightSVG /></button>
                </div>
                <div className="progress-bars">
                    <div className="progress-bar">
                        <p className="progress-bar-title">
                            <IconWorkFasterSVG />
                            {__('Get ', 'gutenverse-companion')}{pro_title}</p>
                        <div className="individual-progress-bar">
                            <div className="progress-bar-fill"></div>
                        </div>
                    </div>
                    <div className="progress-bar">
                        <p className="progress-bar-title">
                            <IconLimitlessDesignSVG />
                            {__('Limitless Design', 'gutenverse-companion')}
                        </p>
                        <div className="individual-progress-bar">
                            <div className="progress-bar-fill"></div>
                        </div>
                    </div>
                    <div className="progress-bar">
                        <p className="progress-bar-title">
                            <IconEngageResultSVG />
                            {__('Engage Result', 'gutenverse-companion')}
                        </p>
                        <div className="individual-progress-bar">
                            <div className="progress-bar-fill"></div>
                        </div>
                    </div>
                    <div className="progress-bar">
                        <p className="progress-bar-title">
                            <IconStarSVG />
                            {__('Upgrade PRO', 'gutenverse-companion')}
                        </p>
                        <div className="individual-progress-bar">
                            <div className="progress-bar-fill"></div>
                        </div>
                    </div>
                </div>
            </Splide>
        </div>
        <div className="upgrade-footer">
            <div className="upgrade-actions">
                <div onClick={() => updateProgress('installPlugin', -1)} className="button-back">
                    <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 5.1C15.3314 5.1 15.6 4.83137 15.6 4.5C15.6 4.16863 15.3314 3.9 15 3.9V5.1ZM0.575736 4.07574C0.341421 4.31005 0.341421 4.68995 0.575736 4.92426L4.39411 8.74264C4.62843 8.97696 5.00833 8.97696 5.24264 8.74264C5.47696 8.50833 5.47696 8.12843 5.24264 7.89411L1.84853 4.5L5.24264 1.10589C5.47696 0.871573 5.47696 0.491674 5.24264 0.257359C5.00833 0.0230446 4.62843 0.0230446 4.39411 0.257359L0.575736 4.07574ZM15 3.9L1 3.9V5.1L15 5.1V3.9Z" fill="#99A2A9" />
                    </svg>
                    {__('Back', 'gutenverse-companion')}
                </div>
                <div onClick={() => updateProgress('done', 1)} className="button-next">{__('Next', 'gutenverse-companion')}</div>
            </div>
        </div>
    </div>;
};

const WizardPage = () => {
    const [progress, setProgress] = useState('installPlugin');
    const [progressCount, setProgressCount] = useState(0);
    const [action, setAction] = useState('install');
    const { gutenverseImgDir : images } = window['GutenverseWizard'];
    const updateProgress = (progress, inc) => {
        setProgress(progress);
        setProgressCount(progressCount + inc);
    };
    const content = () => {
        switch (progress) {
            case 'done':
                return <div className="finalizing">
                    <div className="image-wrapper">
                        <img className="image-done" src={images + '/lite-plus-tf-final.png'} />
                    </div>
                    <div className="final-detail">
                        <h3 className="final-title">{__('Congratulations All Set 🤩', 'gutenverse')}</h3>
                        <p className="final-desc">{__('This theme is built with Gutenverse, a powerful and lightweight Gutenberg blocks and page builder plugin for the WordPress Site Editor.', 'gutenverse')}</p>
                        <div onClick={() => {
                            window.location.href = `${window['GutenThemeConfig']['dashboardPage']}`;
                        }} className="button-visit">{__('Visit Dashboard', 'gutenverse')}</div>
                    </div>
                </div>;
            case 'upgradePro':
                return <UpgradePro updateProgress={updateProgress} />;
            case 'installPlugin':
            default:
                return <InstallPlugin updateProgress={updateProgress} action={action} setAction={setAction} />;
        }
    };

    return <div className="theme-wizard-wrapper">
        <div className="theme-wizard">
            <div className="wizard-header">
                <div className={`progress ${progress === 'installPlugin' ? 'active' : ''} ${progressCount >= 0 ? 'done' : ''}`}>
                    <p className="number">1</p>
                    <h3 className="progress-title">{__('Plugin Requirements', 'gutenverse')}</h3>
                </div>
                <div className={`progress ${progress === 'upgradePro' ? 'active' : ''} ${progressCount >= 1 ? 'done' : ''}`}>
                    <p className="number">2</p>
                    <h3 className="progress-title">{__('Upgrade Your Site', 'gutenverse')}</h3>
                </div>
                <div className={`progress ${progress === 'done' ? 'active' : ''} ${progressCount >= 2 ? 'done' : ''}`}>
                    <p className="number">3</p>
                    <h3 className="progress-title">{__('Finalizing', 'gutenverse')}</h3>
                </div>
            </div>
            <div className="wizard-body">
                {content()}
            </div>
        </div>
    </div>;
};

export default WizardPage;