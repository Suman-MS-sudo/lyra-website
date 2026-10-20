export const THEME_KEY = "lyra-theme";

/** Runs before first paint (inlined in <head>) so the saved or system theme never flashes. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;
