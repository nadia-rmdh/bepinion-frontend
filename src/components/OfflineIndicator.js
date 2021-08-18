import React, { Component } from 'react';
import { Offline } from 'react-detect-offline';
import { translate } from 'react-switch-lang';

class OfflineIndicator extends Component {
	state = {
		closed: false,
	}

	toggleIndicator = () => {
		this.setState({ closed: !this.state.closed })
	}

	render() {
		const { t } = this.props;
		return (
			<Offline>
				{
					this.state.closed ?
						<div style={{ height: 6, width: '100%', cursor: 'pointer' }} className="fixed-top bg-danger" onClick={this.toggleIndicator}></div>
						:
						<div className="fixed-top d-flex p-2 justify-content-center bg-danger align-items-center">
							<span className="ml-auto"><b>Opps! &nbsp;</b>
								{t('Apptidakterhubunginternet')}</span>
							<button className="btn btn-link text-light btn-sm ml-auto text-nowrap" onClick={this.toggleIndicator}><i className="fa fa-times mr-1"></i>{t('tutup')}</button>
						</div>
				}
			</Offline>
		);
	}
}

export default translate(OfflineIndicator);
