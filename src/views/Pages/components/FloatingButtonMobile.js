import React from "react";

class FloatingButtonMobile extends React.Component {
  render() {
    return (
      <div style={{zIndex:999}}>
        <div className="fab-whatsapp">
          <div className="fab-whatsapp-icon-on">
            <a
              href={
                "https://api.whatsapp.com/send?phone=6281226798802&text=Halo%20Widya%2C%20saya%20ingin%20bertanya%20mengenai%20aikrut.id"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={require("../../../assets/img/whatsapp.svg")}
                alt="contact whatsapp"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default FloatingButtonMobile;
