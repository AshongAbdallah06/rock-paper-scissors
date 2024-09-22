import React, { useEffect, useState } from "react";
import logo from "../images/logo.svg";
import useCheckContext from "../hooks/useCheckContext";

const ScoreBoard = () => {
	const {
		roomID,
		isOnePlayer,
		socket,
		getUserStats,
		getPlayerStats,
		currentUserStats,
		dualPlayerStats,
		result,
	} = useCheckContext();

	const user = JSON.parse(localStorage.getItem("user"));
	const usernames = JSON.parse(localStorage.getItem("usernames")) || {};
	const [p1Username, setP1Username] = useState("");
	const [p2Username, setP2Username] = useState("");

	useEffect(() => {
		if (!isOnePlayer && user?.username) {
			socket.emit("username", user.username);
		}

		// Handle username updates
		socket.on("updateUsernames", ({ p1Username, p2Username }) => {
			if (p1Username && p2Username && p1Username !== p2Username) {
				setP1Username(p1Username);
				setP2Username(p2Username);

				getPlayerStats(p1Username, p2Username);
			}

			// Save to localStorage only if they are unique
			if (p1Username !== p2Username) {
				localStorage.setItem("usernames", JSON.stringify({ p1Username, p2Username }));
			}
		});

		if (isOnePlayer) {
			getUserStats(user?.username);
		} else {
			if (usernames?.p1Username && usernames?.p2Username) {
				getPlayerStats(usernames.p1Username, usernames.p2Username);
			}
		}

		// Cleanup on unmount
		return () => {
			socket.off("updateUsernames");
		};
	}, [isOnePlayer, user?.username, socket]);

	return (
		<>
			<section className="scoreBoard">
				<div className="imgCont">
					<img
						src={logo}
						alt="logo"
					/>
				</div>
				{isOnePlayer ? (
					<div className="score">
						<p>score</p>
						<p>{currentUserStats.wins}</p>
					</div>
				) : (
					<div className="p2">
						<div className="score">
							<p>
								{usernames?.p1Username === user.username
									? "You"
									: usernames?.p1Username}

								{usernames?.p1Username === null && "Unavailable"}
							</p>
							<p>
								{usernames?.p1Username !== null &&
								usernames?.p2Username !== null &&
								dualPlayerStats?.player1_username === usernames?.p1Username
									? dualPlayerStats?.player1_wins
									: dualPlayerStats?.player2_wins}
							</p>
						</div>

						<div className="score">
							<p>
								{usernames?.p2Username === user.username
									? "You"
									: usernames?.p2Username}

								{usernames?.p2Username === null && "Unavailable"}
								{/* Create a warning left sign */}
							</p>
							<p>
								{usernames?.p2Username !== null &&
								usernames?.p1Username !== null &&
								dualPlayerStats?.player2_username === usernames?.p2Username
									? dualPlayerStats?.player2_wins
									: dualPlayerStats?.player1_wins}
							</p>
						</div>
					</div>
				)}
			</section>
		</>
	);
};

export default ScoreBoard;
