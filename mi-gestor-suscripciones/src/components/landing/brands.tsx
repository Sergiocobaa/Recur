"use client";

export function BrandSlider() {
    return (
        <section className="w-full py-16 border-y border-slate-100 bg-slate-50/50 overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <p className="text-xs font-bold text-slate-400 mb-10 uppercase tracking-widest">
                    Gestiona cualquier servicio
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <img src="https://images.icon-icons.com/2699/PNG/512/netflix_logo_icon_170919.png" alt="Netflix" className="h-10 w-auto object-contain hover:scale-110 transition-transform" />
                    <img src="https://img.icons8.com/color/600/amazon-prime.png" alt="Prime" className="h-10 w-auto object-contain hover:scale-110 transition-transform" />
                    <img src="https://cdn.iconscout.com/icon/free/png-256/free-chatgpt-icon-svg-download-png-7576880.png?f=webp" alt="ChatGPT" className="h-10 w-auto object-contain hover:scale-110 transition-transform" />
                    <img src="https://cdn-icons-png.flaticon.com/512/732/732171.png" alt="Adobe" className="h-10 w-auto object-contain hover:scale-110 transition-transform" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png" alt="Spotify" className="h-10 w-auto object-contain hover:scale-110 transition-transform" />
                </div>
            </div>
        </section>
    )
}
