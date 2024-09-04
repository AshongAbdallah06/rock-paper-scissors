import React, { useEffect } from "react";
import profileIcon from "../images/person-circle-outline.svg";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import useCheckContext from "../hooks/useCheckContext";
import Axios from "axios";

const Profile = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const { currentUserStats } = useCheckContext();

	return (
		<>
			<Link
				to="/"
				className="header"
			>
				<img
					src={logo}
					alt="logo"
				/>
			</Link>

			<div className="profile-container">
				<div className="profile">
					<img
						src={profileIcon}
						className="profile-icon"
						alt="profile-icon"
					/>
					<p className="name">
						{user.username} ({currentUserStats?.wins})
					</p>
				</div>

				<div className="stats">
					<div className="card">
						<p>Games Played</p>
						<p className="number">{currentUserStats?.gamesPlayed}</p>
					</div>
					<div className="card">
						<p>Wins</p>
						<p className="number">{currentUserStats?.wins}</p>
					</div>
					<div className="card">
						<p>Ties</p>
						<p className="number">{currentUserStats?.ties}</p>
					</div>
					<div className="card">
						<p>Loses</p>
						<p className="number">{currentUserStats?.loses}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
