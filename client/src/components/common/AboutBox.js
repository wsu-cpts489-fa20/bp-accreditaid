import React from 'react';

class AboutBox extends React.Component {

render() {
    return (
        <div className="modal" role="dialog">
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
            <div className="modal-header">
                <h3>About AccreditAid app</h3>
                <button className="modal-close" onClick={this.props.close}>
                    &times;
                </button>
            </div>
            <div className="modal-body">
                <img
                src="https://brand.wsu.edu/wp-content/themes/brand/images/pages/logos/wsu-signature-vertical.svg"
                height="200" width="200"/>
                <p>Version CptS 489 Fa20 Complete (MERN)</p>
                <div style={{textAlign: "left"}}>
                    <p> University degree programs typically seek accreditation from a recognized accreditation board. By ensuring that the degree program meets a set of established standards, such accreditation gives a degree program credibility in the eyes of the potential employers of its graduates. </p>
                    <p> The AccreditAid application is intended to help university degree programs manage the process of acquiring ABET accreditation. There are at least three processes that can be facilitated through AccreditAid: </p>
                    <ul>
                        <li> Collecting and presenting display materials for each required course in a degree program. </li>
                        <li> Identifying student work samples for assessment in targeted courses and facilitating the collaborative process of assessing those work samples against targeted SOs; </li>
                        <li> Collecting, managing and analyzing additional sources of assessment data. </li>
                    </ul>
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn btn-primary btn-color-theme"
                onClick={this.props.close}>OK</button>
                </div>
            </div>
        </div>
        </div>
    );
    }
}

export default AboutBox;