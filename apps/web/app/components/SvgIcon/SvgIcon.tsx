import { useEffect, useState } from "react";
import env from "~/config/env";
import { twMerge } from "tailwind-merge";

interface SvgIconProps {
    url: string;
    size?: number | string;
    className?: string;
    color?: string;
}

export function SvgIcon({
    url,
    size = 24,
    className = "",
    color
}: SvgIconProps) {
    const [svgContent, setSvgContent] = useState<string>("");

    useEffect(() => {
        const fullUrl = env.STRAPI_URL + url;
        fetch(fullUrl)
            .then((res) => res.text())
            .then((data) => {
                // Process the SVG to make it more controllable
                const processedSvg = processSvgContent(data, color);
                setSvgContent(processedSvg);
            })
            .catch((error) => {
                console.error("Error fetching SVG:", error);
            });
    }, [url, color]);

    // Convert size to string with px if it's a number
    const sizeStyle = typeof size === 'number' ? `${size}px` : size;

    const style = {
        width: sizeStyle,
        height: sizeStyle,
        minWidth: sizeStyle,
        minHeight: sizeStyle,
    };

    return (
        <div
            style={style}
            className={twMerge("inline-flex items-center justify-center", className)}
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    );
}

function processSvgContent(svgContent: string, color?: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    const svg = doc.documentElement;

    // Remove existing height/width attributes
    svg.removeAttribute('height');
    svg.removeAttribute('width');

    // Add viewBox if it doesn't exist
    if (!svg.hasAttribute('viewBox') && svg.hasAttribute('width') && svg.hasAttribute('height')) {
        const width = svg.getAttribute('width')?.replace('px', '') || '24';
        const height = svg.getAttribute('height')?.replace('px', '') || '24';
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }

    // Add responsive attributes
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Apply color if provided
    if (color) {
        const processElement = (element: Element) => {
            // Remove fill and stroke attributes
            element.removeAttribute('fill');

            // Handle stroke
            if (element.hasAttribute('stroke')) {
                element.setAttribute('stroke', 'currentColor');
            }

            // Handle inline styles
            const style = element.getAttribute('style');
            if (style) {
                // Remove fill and stroke from inline styles
                const newStyle = style
                    .split(';')
                    .filter(s => s.trim())
                    .map(s => s.trim())
                    .filter(s => !s.startsWith('fill:') && !s.startsWith('stroke:'))
                    .join(';');

                if (newStyle) {
                    element.setAttribute('style', newStyle);
                } else {
                    element.removeAttribute('style');
                }
            }
        };

        // Process the root SVG element
        processElement(svg);
        svg.setAttribute('fill', 'currentColor');

        // Process all child elements
        const elements = svg.getElementsByTagName('*');
        for (let i = 0; i < elements.length; i++) {
            processElement(elements[i]);
        }

        // Add a style tag to handle any path/shape that might need currentColor
        const styleElement = doc.createElement('style');
        styleElement.textContent = `
            path, rect, circle, ellipse, line, polyline, polygon {
                fill: currentColor;
            }
        `;
        svg.insertBefore(styleElement, svg.firstChild);
    }

    return svg.outerHTML;
} 