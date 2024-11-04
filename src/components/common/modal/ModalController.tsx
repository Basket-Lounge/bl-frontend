"use client";

import React from "react";
import { useStore } from "zustand";
import Modal from "./Modal";
import { useModalStore } from "@/stores/modal.stores";
import ModalDeleteComment from "./modal-contents/ModalDeleteComment";

interface IModalData {
  type: TModalType;
  title: string;
  size: TModalSize;
  overlayClose: boolean;
  component: React.FC<any>;
}

const modalData: IModalData[] = [
  {
    type: 'delete-comment',
    title: 'Delete Comment',
    size: 'small',
    overlayClose: false,
    component: ModalDeleteComment
  }
];

const ModalController = () => {
  const { isOpen, closeModal, modalType, props } = useStore(useModalStore);
  if (!isOpen) return null;

  const findModal = modalData.find((modal) => modal.type === modalType);
  if (!findModal) return null;

  const { title, size, overlayClose, component: Component } = findModal;

  const handleOverlayClick = () => {
    closeModal();
  };

  return (
    <div
      className={`flex justify-center items-center fixed inset-0 bg-black z-20`}
      onClick={overlayClose ? handleOverlayClick : undefined}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <Modal title={title} size={size} closeModal={closeModal}>
          <Component {...props} />
        </Modal>
      </div>
    </div>
  );
};

export default ModalController;
