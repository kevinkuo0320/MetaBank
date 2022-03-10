import React, { useRef, useState, useEffect } from "react";
import "./media.scss";
import Video from "../../assets/METABANK_1.mp4";
import { ReactVideoPlay, VideoSourceType } from "react-video-play";

const Media = () => {
    let src = [
        {
            name: "1080p",
            source: [
                {
                    source: "eh5v.files/html5video/METABANK_1.mp4",
                    type: VideoSourceType.video_mp4,
                },
            ],
        },
        {
            name: "720p",
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
            <ReactVideoPlay sources={src} autoplay={true} />
        </div>
    );
};

export default Media;
