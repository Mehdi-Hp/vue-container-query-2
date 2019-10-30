import ResizeObserver from 'resize-observer-polyfill';
import ClassCalculator from './classCalculator/index';
import { optionsUtils } from './_helpers';

const goodToGo = (context) => {
    return context.$options.cq && !!Object.keys(context.$options.cq).length;
};

const cssMediaQueryResolver = {
    maxWidth(desired, actual) {
        return actual <= desired;
    },
    minWidth(desired, actual) {
        return actual > desired;
    }
};

const defaultOptions = {
    classNames: {
        sizes: {
            xsmall: 'xsmall',
            small: 'small',
            medium: 'medium',
            large: 'large',
            xlarge: 'xlarge'
        },
        prepend: ''
    },
    useBEM: true,
    utilityClassNamesRegex: /(?:)/,
    ignoredClasses: ['']
};

export default {
    install(Vue, options) {
        const $cq = Vue.observable({
            contentRect: {},
            breakpoints: {},
            resizeObserver: null
        });

        optionsUtils.validate(options, defaultOptions);
        const normalizedOptions = optionsUtils.normalize(options, defaultOptions);

        Vue.mixin({
            directives: {
                cq: {
                    bind($el, { modifiers }, vnode) {
                        const classCalculator = new ClassCalculator(vnode.context, $el, normalizedOptions);
                        vnode.context.$on('$cq:resize', (contentRect) => {
                            classCalculator.setNewClasses();
                        });
                    },
                    unbind($el, { modifiers }, vnode) {
                        vnode.context.$off('$cq:resize');
                    }
                }
            },
            data() {
                return {};
            },
            computed: {
                $cq() {
                    if (goodToGo(this)) {
                        return $cq;
                    }
                    return null;
                }
            },
            created() {
                if (goodToGo(this)) {
                    this.$set($cq, 'breakpoints', this.$options.cq);
                }
            },
            mounted() {
                if (goodToGo(this)) {
                    Object.keys($cq.breakpoints).forEach((breakpoint) => {
                        $cq[breakpoint] = false;
                    });

                    $cq.resizeObserver = new ResizeObserver((entries) => {
                        entries.forEach((entry) => {
                            this.$set($cq, 'contentRect', entry.contentRect.toJSON());
                            Object.keys($cq.breakpoints).forEach((breakpoint) => {
                                const rules = $cq.breakpoints[breakpoint];
                                Object.entries(rules).forEach((rule) => {
                                    const cssMqRule = rule[0];
                                    const cssMqValue = rule[1];
                                    const fieldToTest = (cssMqRule.toLowerCase().includes('width')) ? 'width' : 'height';
                                    this.$set($cq, breakpoint, cssMediaQueryResolver[cssMqRule](cssMqValue, $cq.contentRect[fieldToTest]));
                                    this.$emit('$cq:resize', $cq.contentRect);
                                });
                            });
                        });
                    });
                    $cq.resizeObserver.observe(this.$el);
                }
            },
            destroyed() {
                if (goodToGo(this)) {
                    $cq.resizeObserver.disconnect();
                }
            }
        });
    }
};
