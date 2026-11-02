import VariableProximity from "@/src/components/react-bits/VariableProximity";

export default function QuoteSection() {
    return (
        <section className="py-8">
            <div className="max-w-3xl mx-auto border-t border-neutral-100 pt-8 flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 mb-4">
                    Words from the Pages
                </span>

                <VariableProximity
                    text="“I am not afraid of storms, for I am learning how to sail my ship.”"
                    className="text-lg md:text-3xl text-center italic font-serif"
                />

                <p className="mt-3 text-[11px] text-neutral-400">
                    — Louisa May Alcott, Little Women
                </p>
            </div>
        </section>
    );
}