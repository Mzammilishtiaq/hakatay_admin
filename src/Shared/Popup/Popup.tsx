import React from 'react'
import { Dialog, DialogTitle } from '@mui/material';
import { Spinner } from '../Spinner/Spinner';
import Style from './Popup.module.scss';
import { IoClose } from "react-icons/io5";


export interface PopupProps {
    isOpen: boolean;
    handleClose: any;
    title?: string;
    width?: any;
    maxWidth?: any;
    isLoading?: boolean;
    borderRadius?: number;
    isFullScreen?: boolean;
    isShowHeader?: boolean;
    childClassName?: string;
    containerClassName?: string;
    children?: React.ReactNode;

}

function Popup({
    isOpen,
    handleClose,
    title = '',
    width = 475,
    maxWidth = 900,
    isLoading = false,
    borderRadius = 25,
    isFullScreen = false,
    isShowHeader = true,
    containerClassName,
    children,

}: PopupProps) {

    const closePopup = () => {
        handleClose?.(true);
    };
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                fullScreen={isFullScreen}
                aria-describedby="alert-dialog-slide-description"
                className={Style.dialog}
                maxWidth={maxWidth}
                PaperProps={{
                    style: {
                        backgroundColor: 'rgb(255 255 255 / 40%)',
                        backdropFilter: 'blur(1px)',
                        width: width,
                        minHeight: 150,
                        borderRadius: borderRadius,
                    },
                }}
            >
                <div className={`${Style.container} ${containerClassName}`}>
                    {isShowHeader && (
                        <DialogTitle>
                            <div className={Style.title}>
                                <div>{title}</div>
                                {isLoading && (
                                    <div className={`${Style.closeIcon} mt-3`}>
                                        <Spinner isLoading={isLoading} />
                                    </div>
                                )}
                                {!isLoading && (
                                    <div className={`${Style.closeIcon} mt-3`} onClick={closePopup}>
                                        <IoClose className='text-xl' />
                                    </div>
                                )}
                            </div>
                        </DialogTitle>
                    )}
                    {children}
                </div>

            </Dialog>
        </div>
    )
}

export default Popup
