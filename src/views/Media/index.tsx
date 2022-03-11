import React, { useRef, useState, useEffect } from "react";
import "./media.scss";
import Video from "../../assets/METABANK_1.mp4";
import { ReactVideoPlay, VideoSourceType } from "react-video-play";

const Media = () => {
    let src = [
        {
            name: "",
            default: true,
            source: [
                {
                    source: Video,
                    type: VideoSourceType.video_mp4,
                },
            ],
        },
    ];

    return (
        <div className="container">
            <ReactVideoPlay sources={src} enableSlider={false} autoplay={true} muted={false} />
        </div>
    );
};

export default Media;
