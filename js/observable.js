export {Observable};

const Observable = value => {
    const listeners = [];
    const getValue = () => value;
    const setValue = newValue => {
        if (newValue === value) {
            return;
        }
        value = newValue;
        [...listeners].forEach(callback => callback(newValue));
    };
    const onChange = callback => {
        listeners.push(callback);
        callback(value);
    };
    return {getValue, setValue, onChange};
};
