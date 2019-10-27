import Vue from 'vue';

const deepMerge = require('deepmerge');

export const optionsUtils = {
    normalize(providedOption, defaultOption) {
        return Vue.observable(
            deepMerge(defaultOption, providedOption)
        );
    },
    validate(providedOption, defaultOptions) {
        Object.keys(providedOption).forEach((passedOptionKey) => {
            if (!defaultOptions.hasOwnProperty(passedOptionKey)) {
                console.error(`${passedOptionKey} doesn't seem to be a valid option. valid options are -> ${defaultOptions}`);
            }
        });
    }
};

export const getMainClasses = ($el, options) => {
    return Array.from($el.classList).filter((classItem) => {
        if (options.classNames.useBEM) {
            return !classItem.includes('--');
        }
        return classItem;
    });
};

export const mapCqToClassName = (className, options) => {
    return options.classNames.sizes[className];
};
export const recalculateClassList = ($el, context, options) => {
    const mainClasses = getMainClasses($el, options);
    const appliedCQs = Object.keys(context.$cq).filter((key) => {
        return context.$cq[key] === true;
    });
    const unAppliedCQs = Object.keys(context.$cq).filter((key) => {
        return context.$cq[key] === false;
    });
    mainClasses.forEach((mainClass) => {
        if (options.classNames.useBEM) {
            appliedCQs.forEach((appliedCQ) => {
                const properCqClass = mapCqToClassName(appliedCQ, options);
                $el.classList.add(`${mainClass}--${properCqClass}`);
            });
            unAppliedCQs.forEach((unAppliedCQ) => {
                const properCqClass = mapCqToClassName(unAppliedCQ, options);
                $el.classList.remove(`${mainClass}--${properCqClass}`);
            });
        } else {
            appliedCQs.forEach((appliedCQ) => {
                const properCqClass = mapCqToClassName(appliedCQ, options);
                $el.classList.add(properCqClass);
            });
            unAppliedCQs.forEach((unAppliedCQ) => {
                const properCqClass = mapCqToClassName(unAppliedCQ, options);
                $el.classList.remove(properCqClass);
            });
        }
    });
};
