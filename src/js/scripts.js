'use strict'

(function() {
    (function() {
        //Polyfill for IE Custom Events
        if(typeof window.CustomEvent === 'function') return false;
        function CustomEvent(event, params) {
            params = params || {bubbles: false, cancelable: false, detail: undefined};
            let evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }
        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent;
    })();

    const fireCallback = function fireCallback(accordionElement, attributeId, eventName) {
        const event = new CustomEvent(eventName, {
            bubbles: true,
            details: {
                accordion: accordionElement,
                accordionID: function accordionID() {
                    return accordionElement.getAttribute(attributeId);
                }
            }
        });
        accordionElement.dispatchEvent(event);
    }

    const selectors = {
        accordionRow: '.accordion__row',
        accordionToggle: '.accordion__btn-toggle',
        accordionContentWrap: '.accordion__contentWrapper',
        accordionContent: '.accordion__content',
        toggleAllButton: '.accordion__btn--toggle-all',
        toggleAllText: 'accordion__btnToggleAllText'
    }

    function Accordion(elem) {
        this.options = {
            expandAllText : elem.dataset.expandAllText || 'Expand All',
            collapseAllText: elem.dataset.collapseAllText || 'Collapse All'
        };
        this.openCounter = 0;
        this.togleAll = false;

        this.accordionRows = elem.querySelectorAll(selectors.accordionRow);
        this.buttonList = elem.querySelectorAll(selectors.accordionToggle);
        this.expcolWrap = elem.querySelectorAll(selectors.accordionContentWrap);
        this.accordionContent = elem.querySelectorAll(selectors.accordionContent);



    }








})();