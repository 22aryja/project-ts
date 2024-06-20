import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import "./modal.scss";

interface Props {
    visible: boolean;
    onClose?: () => void;
    header?: ReactNode;
    body?: ReactNode;
    footer?: ReactNode;
    size?: "small" | "medium" | "large" | "extra-large" | "fullsized";
    variant?: "divided" | "not-divided";
    children?: ReactNode;
}

const Modal: React.FC<Props> = ({
    visible,
    onClose,
    header,
    body,
    footer,
    size,
    variant,
    children,
}) => {
    const handleModalWrapperClick = (event: any) => {
        const target = event.target;
        if (target.getAttribute("class") === "modal-wrapper" && onClose) {
            onClose();
        }
    };

    const root = document.getElementsByTagName("body").item(0);

    if (!root) return null;

    return ReactDOM.createPortal(
        <>
            {visible && (
                <>
                    <div className="modal-mask"></div>
                    <div
                        className="modal-wrapper"
                        onClick={handleModalWrapperClick}
                    >
                        <div
                            className={`modal modal-size-${size ? size : "medium"} modal-${
                                variant ? variant : "divided"
                            }`}
                        >
                            {header && (
                                <div className="modal-header">{header}</div>
                            )}
                            {body && <div className="modal-body">{body}</div>}
                            {footer && (
                                <div className="modal-footer">{footer}</div>
                            )}
                        </div>
                    </div>
                    {children}
                </>
            )}
        </>,
        root,
    );
};

export default Modal;
