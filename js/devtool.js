export {DevTool};

const DevTool = observables => {
    const panel = document.createElement("aside");
    panel.className = "devtool";
    panel.setAttribute("aria-label", "Developer Tool");

    const title = document.createElement("p");
    title.className = "devtool-title";
    title.textContent = "Developer Tool · Shift + D";
    panel.append(title);

    const list = document.createElement("dl");
    panel.append(list);

    const addRow = label => {
        const row = document.createElement("div");
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");
        dt.textContent = label;
        row.append(dt, dd);
        list.append(row);
        return value => {
            dd.textContent = String(value);
        };
    };

    Object.entries(observables).forEach(([name, observable]) => {
        const update = addRow(name);
        observable.onChange(value => update(JSON.stringify(value)));
    });

    const updateViewport = addRow("viewport");
    const refreshViewport = () => updateViewport(window.innerWidth + " × " + window.innerHeight + " px");
    refreshViewport();
    window.addEventListener("resize", refreshViewport);

    const setOpen = open => {
        panel.hidden = !open;
    };
    setOpen(new URLSearchParams(window.location.search).has("dev"));

    document.addEventListener("keydown", event => {
        if (event.shiftKey && event.key === "D") {
            setOpen(panel.hidden);
        }
    });

    document.body.append(panel);
};
