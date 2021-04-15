import React from "react";
import { Input } from "reactstrap";

class FloatingButton extends React.Component {
  state = {
    active: false,
    input: "",
  };

  onChange = (e) => {
    this.setState({ input: e.target.value });
  };

  waChat = event => {
    event.preventDefault();
    const pertanyaan = this.state.input;
    window.open(
      "https://web.whatsapp.com/send?phone=6281226798802&text=" +
        pertanyaan +
        "&source=&data=&app_absent=",
      "_blank"
    ); //to open new page
  };

  render() {
    return (
      <div style={{zIndex:999}}>
        <div className="fab-whatsapp">
          <div
            className={
              this.state.active
                ? "fab-whatsapp-icon-off"
                : "fab-whatsapp-icon-on"
            }
          >
            <img
              src={require("../../../assets/img/whatsapp.svg")}
              alt="contact whatsapp"
              onClick={() => this.setState({ active: !this.state.active })}
            />
          </div>
          <div
            className={
              this.state.active ? "fab-whatsapp-box-on" : "fab-whatsapp-box-off"
            }
          >
            <div className="fab-whatsapp-box-header">
              <a
                href="https://widyaskilloka.com/"
                className="fab-whatsapp-box-header-title"
              >
                Hubungi Kami
              </a>
              <div
                className="fab-whatsapp-box-header-close"
                title="Close"
                onClick={() => this.setState({ active: false })}
              ></div>
            </div>
            <div className="fab-whatsapp-box-content">
              <div className="fab-whatsapp-box-content-message">
                Halo, saya Widya.
              </div>
              <br />
              <div className="fab-whatsapp-box-content-message">
                Ada yang bisa kami bantu ?
              </div>
              <div className="row justify-content-center mx-3">
                <form onSubmit={this.waChat} style={{ display: "contents" }}>
                  <div className="col-9">
                    <Input
                      type="text"
                      className="rounded-12 fab-whatsapp-box-content-message-client mb-3 mb-md-0"
                      value={this.state.input}
                      onChange={this.onChange}
                      placeholder="Tulis pesan anda disini"
                    />
                  </div>
                  <div className="col-3">
                    <button
                      rel="noopener noreferrer"
                      className="btn mt-1 btn-lg btn-netis-primary float-right text-center"
                    >
                      Kirim
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FloatingButton;
