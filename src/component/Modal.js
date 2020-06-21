import React from 'react';

const defaultImg = "https://images.all-free-download.com/images/graphiclarge/small_mouse_macro_515329.jpg";

export default class Modal extends React.Component {

	constructor(props) {
		super(props);
		this.closeModal = this.closeModal.bind(this);
		this.modalClick = this.modalClick.bind(this);
		this.escFunction = this.escFunction.bind(this);
	}

	componentDidMount() {
		if (this.el) {
			window.jQuery(this.el).modal('show');
			document.addEventListener("keydown", this.escFunction);
		}
	}

	componentWillUnmount() {
		console.log('componentWillUnmount')
	}

	closeModal(e) {
		this.props.removeModal();
		// window.jQuery(this.el).on('hidden.bs.modal', function() { window.jQuery(this).remove(); });
	}

	escFunction(event) {
		if(event.keyCode === 27) {
			this.closeModal();
		}
	}

	modalClick(e) {
		if (e.target === e.currentTarget) {
			this.closeModal();
		}
	}

	render() {
		return (
			<div className="modal fade in" id="exampleModalLive" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"
				ref={el => this.el = el} onClick={this.modalClick}>
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="exampleModalLabel">{this.props.product.name}</h5>
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
			      	<p>
			      		<img src={this.props.product.image ?? defaultImg} alt={this.props.product.name} style={{maxWidth:'450px', maxheight: '600px'}} />
			      	</p>
			        <p>{this.props.product.info}</p>
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>Close</button>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
}