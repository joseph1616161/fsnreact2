import React, { Component } from "react";

class Header extends Component {
	render() {
		return (
			<nav>
				<div className="container">
					<div className="nav-wrapper">
						<a href="/" className="left-brand-logo">
							Emaily
						</a>
						<ul className="right hide-on-med-and-down">
							<li>
								<a href="/auth/google">Login with Google</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default Header;
