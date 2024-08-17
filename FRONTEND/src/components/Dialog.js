import React from "react";
import modalImage from "../images/image-rules.svg";
import closeIcon from "../images/icon-close.svg";
import useCheckContext from "../hooks/useCheckContext";

const Dialog = () => {
	const { isRulesModalShow, setIsRulesModalShow } = useCheckContext();

	const closeModal = () => {
		setIsRulesModalShow(false);
	};

	return (
		<>
			{isRulesModalShow && (
				<div className="rules-modal">
					<div>
						<h1>RULES</h1>
						<button onClick={closeModal}>
							<img
								src={closeIcon}
								alt=""
							/>
						</button>
					</div>
					<img
						src={modalImage}
						alt=""
					/>
				</div>
			)}
		</>
	);
};

export default Dialog;
