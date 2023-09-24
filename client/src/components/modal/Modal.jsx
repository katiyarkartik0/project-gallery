import { createPortal } from "react-dom";
import "./Modal.css";

const Modal = ({ toggleModal, title, technologies = [{}], frontend, backend, databases, infrastructure }) => {

    return createPortal(
        <>
            <div className="modal-container">
                <div
                    className="modal-background"
                    id="modalBackground"
                    onClick={toggleModal}
                ></div>
                <div className="modal" id="modal">
                    <div className="modal-header">
                        <div className="modalHeaderHeading">{title}</div>
                        <div className="close-btn" id="closeModalBtn" onClick={toggleModal}>
                            &times;
                        </div>
                    </div>
                    <div className="modal-content">
                            <div className="card-content">
                                <p className="card-text"><strong>Technologies:</strong> {technologies?.map((technology) => <div className="tag tag-blue">{technology?.title || ""}</div>)}</p>
                                <p className="card-text"><strong>Frontend:</strong>  {frontend?.map((technology) =>  <div className="tag tag-blue">{technology?.title || ""}</div>)}</p>
                                <p className="card-text"><strong>Backend:</strong> {backend?.map((technology) =>  <div className="tag tag-blue">{technology?.title || ""}</div>)}</p>
                                <p className="card-text"><strong>Databases:</strong> {databases?.map((technology) =>  <div className="tag tag-blue">{technology?.title || ""}</div>)}</p>
                                <p className="card-text"><strong>Infrastructure:</strong> {infrastructure?.map((technology) =>  <div className="tag tag-blue">{technology?.title || ""}</div>)}</p>
                            </div>
                    
                    </div>

                    <div className="modal-footer" onClick={toggleModal}>
                        <button className="saveBtn">Got it</button>
                    </div>
                </div>
            </div>
        </>,
        document.querySelector(".portalModal")
    );
};

export default Modal;
