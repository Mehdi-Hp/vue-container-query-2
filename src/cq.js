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
    utilityClassNamesRegex: /$^/,
    ignoredClasses: ['']
};

export default {
    install(Vue, options) {
        optionsUtils.validate(options, defaultOptions);
        const normalizedOptions = optionsUtils.normalize(options, defaultOptions);

        Vue.mixin({
            directives: {
                cq: {
                    bind($el, { modifiers }, vnode) {
                        const classCalculator = new ClassCalculator(vnode.context, $el, normalizedOptions);
                        vnode.context.$on('$cq:resize', (contentRect) => {
                            // TODO: I have vnode.data.staticClass
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
                        return this._cq;
                    }
                    return null;
                }
            },
            beforeCreate() {
                if (goodToGo(this)) {
                    this._cq = Vue.observable({
                        contentRect: {},
                        breakpoints: {},
                        resizeObserver: null
                    });
                }
            },
            created() {
                if (goodToGo(this)) {
                    this.$set(this._cq, 'breakpoints', this.$options.cq);
                }
            },
            mounted() {
                if (goodToGo(this)) {
                    Object.keys(this._cq.breakpoints).forEach((breakpoint) => {
                        this._cq[breakpoint] = false;
                    });

                    this._cq.resizeObserver = new ResizeObserver((entries) => {
                        console.log({ entries });
                        entries.forEach((entry) => {
                            this.$set(this._cq, 'contentRect', entry.contentRect.toJSON());
                            Object.keys(this._cq.breakpoints).forEach((breakpoint) => {
                                const rules = this._cq.breakpoints[breakpoint];
                                Object.entries(rules).forEach((rule) => {
                                    const cssMqRule = rule[0];
                                    const cssMqValue = rule[1];
                                    const fieldToTest = (cssMqRule.toLowerCase().includes('width')) ? 'width' : 'height';
                                    this.$set(this._cq, breakpoint, cssMediaQueryResolver[cssMqRule](cssMqValue, this._cq.contentRect[fieldToTest]));
                                    this.$emit('$cq:resize', this._cq.contentRect);
                                });
                            });
                        });
                    });
                    this._cq.resizeObserver.observe(this.$el);
                }
            },
            destroyed() {
                if (goodToGo(this)) {
                    this._cq.resizeObserver.disconnect();
                }
            }
        });
    }
};
