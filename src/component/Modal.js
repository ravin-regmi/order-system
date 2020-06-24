import React, {useState} from 'react';

const defaultImg = "https://images.all-free-download.com/images/graphiclarge/small_mouse_macro_515329.jpg";

export default function Modal(props) {

	const [showModal, setShowModal] = useState(false);

	function productDetail(e, id) {
		e.preventDefault();
		setShowModal(true);
	}

	const removeModal = () => { setShowModal(false); }

	const modalHtml = showModal ? <ModalComponent product={props.product} removeModal={removeModal} /> : null;

	const btnClass = props.btnClass ?? "btn btn-info btn-sm";
	const btnText = props.btnText ?? "View Details";
	let btnHtml = null;
	if (props.btnHtml === 'a') {
		btnHtml = <a className={btnClass} onClick={(e) => productDetail(e, props.product.id)} style={{cursor: 'pointer'}}>{btnText}</a>;
	} else {
		btnHtml = <button className={btnClass} onClick={(e) => productDetail(e, props.product.id)}>{btnText}</button>;
	}

	return (
		<>
		{btnHtml}
		{modalHtml}
		</>
	);
}

class ModalComponent extends React.Component {

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
			        <p>Price: 
			        	<span className="font-italic badge badge-warning text-danger">{this.props.product.currency} {this.props.product.price}</span>
			        </p>
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