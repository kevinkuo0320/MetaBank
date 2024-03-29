import React, { useState } from "react";
import "./header.scss";
import { SvgIcon, Link, Box, Popper, Fade } from "@material-ui/core";
import { ReactComponent as Twitter } from "../../../../assets/icons/twitter.svg";
import { ReactComponent as Discord } from "../../../../assets/icons/discord.svg";
import { ReactComponent as Medium } from "../../../../assets/icons/medium.svg";
import { ReactComponent as Media } from "../../../../assets/icons/dashboard.svg";
import { useHistory } from "react-router-dom";
import { ReactComponent as MB } from "../../../../assets/icons/metabank_logo_2.svg";
import { NavLink } from "react-router-dom";

function Header() {
    let history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);

    return (
        <div className="landing-header">
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <img src="./metabank_logo_colored_transparent.png" style={{ height: 50, width: 69, padding: 10 }} />
                <p className="fontMetaBank">MetaBank</p>

                <div className="web-buttons">
                    <button className="fontOthers" onClick={() => history.push("/stake")}>
                        Enter
                    </button>

                    <button
                        className="fontOthers"
                        onClick={e => {
                            e.preventDefault();
                            window.open("https://metabank-finance.gitbook.io/metabank-finance-litepaper/");
                        }}
                    >
                        Whitepaper
                    </button>

                    <button
                        className="fontOthers"
                        onClick={e => {
                            e.preventDefault();
                            window.open("https://twitter.com/metabankfinance");
                        }}
                    >
                        Twitter
                    </button>

                    <button
                        className="fontOthers"
                        onClick={e => {
                            e.preventDefault();
                            window.open("https://dsc.gg/metabankfinance");
                        }}
                    >
                        Discord
                    </button>

                    <button
                        className="fontOthers"
                        onClick={e => {
                            e.preventDefault();
                            window.open("https://vimeo.com/686695388");
                        }}
                    >
                        Media
                    </button>
                </div>
            </div>
            <div className="landing-header-nav-wrap">
                <Box component="div" onMouseEnter={e => handleClick(e)} onMouseLeave={e => handleClick(e)}>
                    <p className="landing-header-nav-text">More</p>
                    <Popper className="landing-header-poper" open={open} anchorEl={anchorEl} transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={200}>
                                <div className="tooltip">
                                    <Link className="tooltip-item" component={NavLink} to="/stake">
                                        <SvgIcon color="primary" component={MB} />
                                        <p>Enter</p>
                                    </Link>

                                    <Link className="tooltip-item" href="https://metabank-finance.gitbook.io/metabank-finance-litepaper/" target="_blank">
                                        <SvgIcon color="primary" component={Medium} />
                                        <p>Whitepaper</p>
                                    </Link>

                                    <Link className="tooltip-item" href="https://twitter.com/metabankfinance" target="_blank">
                                        <SvgIcon color="primary" component={Twitter} />
                                        <p>Twitter</p>
                                    </Link>

                                    <Link className="tooltip-item" href="https://dsc.gg/metabankfinance" target="_blank">
                                        <SvgIcon color="primary" component={Discord} />
                                        <p>Discord</p>
                                    </Link>

                                    <Link className="tooltip-item" href="https://vimeo.com/686695388" target="_blank">
                                        <SvgIcon color="primary" component={Media} />
                                        <p>Media</p>
                                    </Link>
                                </div>
                            </Fade>
                        )}
                    </Popper>
                </Box>
            </div>
        </div>
    );
}

export default Header;
