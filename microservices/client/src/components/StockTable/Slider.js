import React, { useState, useEffect, useRef } from 'react';

export const Slider = ({ onSlide, id }) => {
    const [mouseIsDown, setMouseIsDown] = useState(false);
    const xOrigin = useRef();

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (!xOrigin.current) {
                xOrigin.current = event.x;
            }
            const diff = Math.abs(xOrigin.current - event.x);
            const delta = xOrigin.current > event.x ? -diff : diff;
            onSlide(delta, id);
        };
        if (mouseIsDown) {
            document
                .querySelector('body')
                .addEventListener('mousemove', handleMouseMove);
            document
                .querySelector('body')
                .addEventListener('mouseup', () => setMouseIsDown(false));
        } else {
            document
                .querySelector('body')
                .removeEventListener('mousemove', handleMouseMove);
        }
        return () => {
            document
                .querySelector('body')
                .removeEventListener('mousemove', handleMouseMove);
        };
    }, [mouseIsDown, onSlide, id]);

    return (
        <div
            onMouseDown={() => setMouseIsDown(true)}
            onMouseUp={() => setMouseIsDown(false)}
        >
            ||
        </div>
    );
};
