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
