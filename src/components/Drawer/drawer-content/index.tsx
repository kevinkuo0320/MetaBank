import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";

import DashboardIcon from "../../../assets/icons/dashboard.svg";
import { trim, shorten } from "../../../helpers";
import { useAddress } from "../../../hooks";
import useBonds from "../../../hooks/bonds";
import { Link, withMobileDialog } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./drawer-content.scss";
import DocsIcon from "../../../assets/icons/stake.svg";
import classnames from "classnames";
import Twitter from "../../../assets/icons/twitter.svg";
import Discord from "../../../assets/icons/discord.svg";
import MB from "../../../assets/icons/metabank_logo_2.svg";
import TextLoop from "react-text-loop";

function NavContent() {
    const [isActive] = useState();
    const address = useAddress();
    const { bonds } = useBonds();

    const checkPage = useCallback((location: any, page: string): boolean => {
        const currentPath = location.pathname.replace("/", "");
        if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
            return true;
        }
        if (currentPath.indexOf("stake") >= 0 && page === "stake") {
            return true;
        }
        if (currentPath.indexOf("mints") >= 0 && page === "mints") {
            return true;
        }
        return false;
    }, []);

    return (
        <div className="dapp-sidebar">
            <div className="branding-header">
                <img alt="metabank-icon" src="./metabank_logo_colored_transparent.png" style={{ height: "auto", width: "10rem" }} />

                {/*{address && (
                    <div className="wallet-link">
                        <Link href={`https://cchain.explorer.avax.network/address/${address}`} target="_blank">
                            <p>{shorten(address)}</p>
                        </Link>
                    </div>
                )}*/}

                <div
                    className="wallet-link-1"
                    style={{
                        fontSize: "35px",
                    }}
                >
                    <p> MetaBank </p>
                </div>

                <div className="wallet-link">
                    <p> The world's first gamified</p>
                    <p>high yield protocol</p>
                </div>

                <div className="wallet-link">
                    <TextLoop adjustingSpeed={1000}>
                        <span>
                            <p> Join Metabank Games </p>
                        </span>
                        <span>
                            <p> Award winners with </p>
                        </span>
                    </TextLoop>
                </div>
                <div className="wallet-link">
                    <TextLoop adjustingSpeed={1000}>
                        <span>
                            <p>Season 1 now!</p>
                        </span>
                        <span>
                            <p>Bitcoin, ETH, AVAX</p>
                        </span>
                    </TextLoop>
                </div>
            </div>

            <div className="dapp-menu-links">
                <div className="dapp-nav">
                    <Link
                        component={NavLink}
                        to="/"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "dashboard");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="MB" src={MB} className="mb-logo" />
                            <p>Home Page</p>
                        </div>
                    </Link>

                    {/*<Link
                        component={NavLink}
                        to="/stake"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "stake");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={StakeIcon} />
                            <p>Stake</p>
                        </div>
                    </Link>*/}

                    <Link href="https://metabank-finance.gitbook.io/metabank-finance-litepaper/" target="_blank" className={classnames("button-dapp-menu", { active: isActive })}>
                        <div className="dapp-menu-item">
                            <img alt="" src={DocsIcon} />
                            <p>Document</p>
                        </div>
                    </Link>

                    <Link href="https://twitter.com/metabankfinance" target="_blank" className={classnames("button-dapp-menu", { active: isActive })}>
                        <div className="dapp-menu-item">
                            <img alt="" src={Twitter} />
                            <p>Twitter</p>
                        </div>
                    </Link>

                    <Link href="https://dsc.gg/metabankfinance" target="_blank" className={classnames("button-dapp-menu", { active: isActive })}>
                        <div className="dapp-menu-item">
                            <img alt="" src={Discord} />
                            <p>Discord</p>
                        </div>
                    </Link>

                    {/* <Link
                        component={NavLink}
                        id="bond-nav"
                        to="/mints"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "mints");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={BondIcon} />
                            <p>Mint</p>
                        </div>
                    </Link>

                    <div className="bond-discounts">
                        <p>Mint discounts</p>
                        {bonds.map((bond, i) => (
                            <Link component={NavLink} to={`/mints/${bond.name}`} key={i} className={"bond"}>
                                {!bond.bondDiscount ? (
                                    <Skeleton variant="text" width={"150px"} />
                                ) : (
                                    <p>
                                        {bond.displayName}
                                        <span className="bond-pair-roi">{bond.bondDiscount && trim(bond.bondDiscount * 100, 2)}%</span>
                                    </p>
                                )}
                            </Link>
                        ))}
                    </div> */}
                </div>
            </div>
            {/*<div className="dapp-menu-doc-link">
                <Link href="https://metabank-finance.gitbook.io/metabank-finance-litepaper/" target="_blank">
                    <img alt="" src={DocsIcon} />
                    <p>Docs</p>
                </Link>
            </div>*/}
            {/*<Social />*/}
        </div>
    );
}

export default NavContent;
