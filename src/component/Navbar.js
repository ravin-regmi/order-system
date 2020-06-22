import React from 'react';
import {Link} from 'react-router-dom';
import logo from '.././logo.svg';

export default class Navbar extends React.Component {
	
	constructor(props) {
		super(props);
		this.selectCategory = React.createRef();
		this.categoryChange = this.categoryChange.bind(this);
		this.removeCategoryFilter = this.removeCategoryFilter.bind(this);
		this.productSearch = this.productSearch.bind(this);
		this.removeProductFilter = this.removeProductFilter.bind(this);
	}

	categoryChange(e) {
		this.props.categoryChange(e.target.value==="null" ? null : e.target.value);
	}

	removeCategoryFilter(e) {
		this.props.categoryChange(null);
	}

	productSearch(e) {
		this.props.productSearch(e.target.value);
	}

	removeProductFilter(e) {
		this.props.productSearch('');
	}

	render() {
		let categoryFilterLabel = null;
		const categoryOptHtml = this.props.categoryList.map(category => {
			if (this.props.categoryFilter && category.id === +this.props.categoryFilter) {
				categoryFilterLabel = <label className="badge badge-info" title="Click to remove" onClick={this.removeCategoryFilter}>{category.name}</label>
			}
			return <option key={category.id} value={category.id}>{category.name}</option>;
		});

		const productFilterLabel = (this.props.productFilter !== "") 
			? <label className="badge badge-info" title="Click to remove" onClick={this.removeProductFilter}>{this.props.productFilter}</label>
			: null;

		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
			  <a className="navbar-brand" href="/">Reload Page</a>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>
			  <div className="collapse navbar-collapse" id="navbarNav">
			    <ul className="navbar-nav">
			      <li className="nav-item active">
			        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
			      </li>
			      <li className="nav-item">
			      	<div className="form-group post-input">
				        <select className="form-control" ref={this.selectCategory} onChange={this.categoryChange}>
				        	<option value="null">-- Select Category -- </option>
				        	{categoryOptHtml}
				        </select>
				        {categoryFilterLabel}
			        </div>
			      </li>
			      <li>
			      	<div className="form-group post-input">
			      		<input className="form-control" placeholder="Type to search product..." onBlur={this.productSearch} defaultValue={this.props.productFilter} />
			      		{productFilterLabel}
			      	</div>
			      </li>
			    </ul>
			  </div>
			  <p className="font-weight-bold" style={{margin:0}}>
			  	<img style={{width:'30px'}} alt="demo" src={logo} />
			  	Hello User!
			  </p>
			</nav>
		);
	}
}