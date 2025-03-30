interface QuoteProps {
    quote: string;
    author: string;
}

export function Quote({ quote, author }: QuoteProps) {
    return (
        <div className="flex flex-col items-center justify-center my-8 px-3 py-4 border border-primary/20 bg-primary/5 relative max-w-3xl mx-auto">
            <div className="text-4xl font-bold absolute -top-4 left-4 text-primary/20">"</div>
            <div className="text-sm text-primary/90 font-medium italic mb-3 mt-2 text-center">{quote}</div>
            <div className="text-xs text-secondary font-medium before:content-['—_'] text-center">{author}</div>
            <div className="text-4xl font-bold absolute -bottom-6 right-4 text-primary/20">"</div>
        </div>
    );
}
