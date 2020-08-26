import React, { Component } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Account from "./Account";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropDown: false,
    };
    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

  toggleDropDown(e) {
    e.preventDefault();
    const { showDropDown } = this.state;
    this.setState({
      showDropDown: !showDropDown,
    });
  }

  render() {
    const { showDropDown } = this.state;
    return (
      <header>
        <div className="headerin">
          <Logo />
          <Navigation />
          <Account
            showDropDown={showDropDown}
            toggleDropDown={this.toggleDropDown}
          />
        </div>
      </header>
    );
  }
}

export default Header;
