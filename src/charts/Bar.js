import React, { useRef, useEffect, useState } from "react";
import { select } from "d3-selection";
import { scaleBand, scaleLinear } from "d3-scale";
import randomstring from "randomstring";

let initialData = [
    {
        name: "foo",
        units: 32
    },
    {
        name: "bar",
        units: 67
    },
    {
        name: "baz",
        units: 81
    },
    {
        name: "hoge",
        units: 38
    },
    {
        name: "piyo",
        units: 28
    },
    {
        name: "hogera",
        units: 59
    }
];

const Bar = () => {
    const dimensions = { width: 600, height: 500 };
    const ref = useRef(null);
    const [selection, setSelection] = useState(null);
    const [data, setData] = useState(initialData);

    let x = scaleBand()
        .domain(data.map(d => d.name))
        .range([0, dimensions.width]);

    let y = scaleLinear()
        .domain([0, 100])
        .range([dimensions.height, 0]);

    const onClick = () => {
        const name = randomstring.generate(10);
        const units = Math.floor(Math.random() * 80 + 20);
        setData([...data, { name, units }]);
    };

    useEffect(() => {
        if (!selection) {
            setSelection(select(ref.current));
        } else {
            selection
                .selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("height", d => dimensions.height - y(d.units))
                .attr("width", x.bandwidth)
                .attr("x", d => x(d.name))
                .attr("y", d => y(d.units));
        }
    }, [selection]);

    useEffect(() => {
        if (selection) {
            x = scaleBand()
                .domain(data.map(d => d.name))
                .range([0, dimensions.width]);

            y = scaleLinear()
                .domain([0, 100])
                .range([dimensions.height, 0]);

            const rects = selection.selectAll("rect").data(data);

            rects
                .attr("x", d => x(d.name))
                .attr("y", d => y(d.units))
                .attr("height", d => dimensions.height - y(d.units))
                .attr("width", x.bandwidth);

            rects
                .enter()
                .append("rect")
                .attr("x", d => x(d.name))
                .attr("y", d => y(d.units))
                .attr("height", d => dimensions.height - y(d.units))
                .attr("width", x.bandwidth);
        }
    }, [data]);

    return (
        <div>
            <svg ref={ref} {...dimensions}></svg>
            <button onClick={onClick}>Add Random</button>
        </div>
    );
};

export default Bar;
