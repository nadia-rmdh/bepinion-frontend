import React, { useRef, useEffect } from 'react';

let isPlayed = false;

function OurWork() {
    const ref = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        const videoId = "7w8XDixv1Lw";
        window.onYouTubeIframeAPIReady = function (e) {
            const YT = window.YT;
            playerRef.current = new YT.Player('player', {
                videoId,
                width: 788.54,
                height: 443
            })
        }
        return () => {
            tag.remove();
        }
    }, [])

    useEffect(() => {
        function onWindowScroll() {
            if (playerRef && playerRef.current) {
                if ((window.scrollY + 100) > (ref.current.offsetTop)) {
                    if (!isPlayed) {
                        isPlayed = true;
                        playerRef.current.playVideo();
                    }
                }
            }
        }
        window.addEventListener('scroll', onWindowScroll);
        return () => window.removeEventListener('scroll', onWindowScroll);
    }, [])

    return (
        <section id="ourwork" className="text-center ourwork" ref={ref}>
            <h3 className="text-center sub-title">Cara Kami Bekerja</h3>
            <hr className="hr-work" />
            <div className="text-center work-content d-flex justify-content-center">
                <div className="border-right" id="player" />
                {/* <iframe title="our work" className="border-right" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="788.54" height="443" type="text/html" src={`https://www.youtube.com/embed/ZceZp5tTUyk?autoplay=${workPosition}&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&mute=1`}></iframe> */}
            </div>
        </section>
    )
}

export default OurWork;