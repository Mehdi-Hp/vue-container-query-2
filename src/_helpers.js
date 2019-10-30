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


const getMainClasses = ($el, options) => {
    return Array.from($el.classList).filter((classItem) => {
        if (options.classNames.useBEM) {
            return !classItem.includes('--');
        }
        return classItem;
    });
};

const mapCqToClassName = (className, options) => {
    return options.classNames.sizes[className];
};

const getAppliedClasses = (context) => {
    return Object.keys(context.$cq).filter((key) => {
        return context.$cq[key] === true;
    });
};

const getUnappliedClasses = (context) => {
    return Object.keys(context.$cq).filter((key) => {
        return context.$cq[key] === false;
    });
};

const getProperCqClass = (context, CQ, options) => {
    if (options.pixelMode) {
        return context.$cq.contentRect.width;
    }
    return mapCqToClassName(CQ, options);
};

const attachCalculatedCqClasses = (context, $el, mainClass, appliedCQs, unAppliedCQs, options, getCqClassName) => {
    appliedCQs.forEach((appliedCQ) => {
        const properCqClass = getProperCqClass(context, appliedCQ, options);
        $el.classList.add(
            getCqClassName(properCqClass)
        );
    });
    unAppliedCQs.forEach((unAppliedCQ) => {
        const properCqClass = getProperCqClass(context, unAppliedCQ, options);
        $el.classList.remove(
            getCqClassName(properCqClass)
        );
    });
};

const attachProperClasses = (context, $el, mainClasses, appliedCQs, unAppliedCQs, options) => {
    mainClasses.forEach((mainClass) => {
        if (options.classNames.useBEM) {
            attachCalculatedCqClasses(context, $el, mainClass, appliedCQs, unAppliedCQs, options, (properCqClass) => {
                return `${mainClass}--${properCqClass}`;
            });
        } else if (options.classNames.pixelMode) {
            attachCalculatedCqClasses(context, $el, mainClass, appliedCQs, unAppliedCQs, options);
        } else {
            attachCalculatedCqClasses(context, $el, mainClass, appliedCQs, unAppliedCQs, options, (properCqClass) => {
                return properCqClass;
            });
        }
    });
};


export const recalculateClassList = ($el, context, options) => {
    const mainClasses = getMainClasses($el, options);
    const appliedCQs = getAppliedClasses(context);
    const unAppliedCQs = getUnappliedClasses(context);
    attachProperClasses(context, $el, mainClasses, appliedCQs, unAppliedCQs, options);
};
