import { useEffect, useState } from "react";

export function useApiFullScreen() {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const goFullScreen = () => {
    const doc = document.documentElement;

    if (doc.requestFullscreen) {
      doc.requestFullscreen();
    } else if ((doc as any).mozRequestFullScreen) {
      /* Firefox */
      (doc as any).mozRequestFullScreen();
    } else if ((doc as any).webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      (doc as any).webkitRequestFullscreen();
    } else if ((doc as any).msRequestFullscreen) {
      /* IE/Edge */
      (doc as any).msRequestFullscreen();
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      /* Firefox */
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      /* IE/Edge */
      (document as any).msExitFullscreen();
    }
  };

  useEffect(() => {
    const checkFullScreen = () => {
      setIsFullScreen(document.fullscreenElement != null);
    };

    // Adiciona ouvintes de eventos para mudanças no modo de tela cheia
    document.addEventListener("fullscreenchange", checkFullScreen);
    document.addEventListener("webkitfullscreenchange", checkFullScreen); // Para Safari
    document.addEventListener("mozfullscreenchange", checkFullScreen); // Para Firefox
    document.addEventListener("MSFullscreenChange", checkFullScreen); // Para IE

    // Limpa os ouvintes de eventos quando o componente é desmontado
    return () => {
      document.removeEventListener("fullscreenchange", checkFullScreen);
      document.removeEventListener("webkitfullscreenchange", checkFullScreen);
      document.removeEventListener("mozfullscreenchange", checkFullScreen);
      document.removeEventListener("MSFullscreenChange", checkFullScreen);
    };
  }, []);

  return { exitFullScreen, goFullScreen, isFullScreen };
}
