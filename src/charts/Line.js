import React, { useRef, useState, useEffect } from "react";

import { select } from "d3-selection";
import { initialData } from "./initialdata";
import { scaleLinear, scaleBand } from "d3-scale";
import { line, curveMonotoneX } from "d3-shape";

const Line = () => {
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

    let lineGraph = line()
        .x(d => x(d.name))
        .y(d => y(d.units))
        .curve(curveMonotoneX);

    useEffect(() => {
        if (!selection) {
            setSelection(select(ref.current));
        } else {
            selection
                .append("path")
                .datum(data)
                .attr("d", lineGraph)
                .attr("fill", "none")
                .attr("stroke", "black");
        }
    }, [selection]);

    return (
        <div>
            <svg ref={ref} {...dimensions}></svg>
        </div>
    );
};

export default Line;
