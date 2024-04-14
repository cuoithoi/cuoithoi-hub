import React, { useCallback, useEffect, useRef, useState } from "react";
import heartIcon from "@/assets/svg/letter-heart.svg";
import heartIconFill from "@/assets/svg/letter-heart-fill.svg";
import { Carousel } from "react-responsive-carousel";
import Popup from "../modal/Popup";
import CarouselGallery from "./sub-comp/CarouselGallery";
import { api } from "@/utils/axios";
import { toast } from "react-toastify";
import FsLightbox from "fslightbox-react";
import InvitationRight from "../icons/InvitationRight";
import InvitationLeft from "../icons/InvitationLeft";
import { INVITATION_STYLES } from "@/commons/Constant.ts";

import flower5 from "@/assets/invitation/golden/flower5.svg";
import flower6 from "@/assets/invitation/golden/flower6.svg";

const Gallery = ({ id, invitationStyle }) => {
    const modalRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [album, setAlbum] = useState([]);
    const [selectedItem, setSelectedItem] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const getDataImage = async () => {
            setIsLoading(true);
            const resp = await api.get(`list-images?invitationId=${id}`);
            setAlbum(resp.data.data);
            setIsLoading(false);
        };
        getDataImage();
    }, []);

    const showLightbox = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handleLikeImage = useCallback(async (index, _id) => {
        try {
            await api.post("/like-image", {
                _id: _id,
                like: true,
            });
            const newAlbum = [...album];
            newAlbum[index].totalLike = newAlbum[index].totalLike + 1;
            setAlbum(newAlbum);
        } catch (error) {
            toast.error(
                "something went wrong, maybe your network is overloaded"
            );
        }
    });

    const urls = album.map((item) => item.url);

    if (isLoading) return;

    if (invitationStyle == INVITATION_STYLES.GOLDEN) {
        return (
            <div
                className="py-10 px-10 section-mb layout-mw gallery-section bg-[#FAF9F5]"
                id="gallery"
            >
                <div className="flex justify-center pb-5">
                    <img className="w-12" src={flower5} />
                    <span className="text-4xl pl-1 pr-1 text-center font-[SFUTrajanRegular] text-[#7F4E26]">
                        OUR MEMORIES
                    </span>
                    <img className="w-12" src={flower6} />
                </div>
                <div className="">
                    <div className="relative">
                        <div
                            className="absolute bottom-8 right-2 w-10 h-6 flex items-center justify-end cursor-pointer rounded-md z-50  bg-bg-appear"
                            style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
                        >
                            <span style={{ color: "white" }} className="mr-1">
                                {album[selectedItem].totalLike}
                            </span>
                            <img
                                src={
                                    album[selectedItem].totalLike === 0
                                        ? heartIcon
                                        : heartIconFill
                                }
                                alt="heart icon"
                                className="w-6 h-6 fill-icon"
                                onClick={() =>
                                    handleLikeImage(
                                        selectedItem,
                                        album[selectedItem]._id
                                    )
                                }
                            />
                        </div>
                        <Carousel
                            showStatus={false}
                            showIndicators={false}
                            showThumbs={false}
                            selectedItem={selectedItem}
                            dynamicHeight={false}
                            showArrows={false}
                        >
                            {album?.map((image, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="gallery-image relative"
                                        onClick={() => showLightbox()}
                                    >
                                        <img
                                            src={image.url}
                                            alt="image gallery"
                                        />
                                    </div>
                                );
                            })}
                        </Carousel>
                    </div>
                    {
                        <FsLightbox
                            toggler={open}
                            sources={urls}
                            sourceIndex={selectedItem}
                        />
                    }
                    <ul className=" gallery-container">
                        {album.map((image, index) => {
                            return (
                                <li
                                    key={index}
                                    className="gallery-img relative"
                                    onClick={() => setSelectedItem(index)}
                                >
                                    <div className="img-container">
                                        <img
                                            src={image.url}
                                            alt="image gallery"
                                        />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    } else if (invitationStyle == INVITATION_STYLES.PINK) {
        return (
            <div
                className="py-10 px-3 section-mb layout-mw gallery-section"
                id="gallery"
            >
                <div className="flex justify-center pb-5">
                    <span className="text-3xl pl-1 pr-1 text-center font-[NexaBold] text-[#F9959D]">
                        OUR MEMORIES
                    </span>
                </div>
                <div className="">
                    <div className="relative">
                        <div
                            className="absolute bottom-8 right-2 w-10 h-6 flex items-center justify-end cursor-pointer rounded-md z-50  bg-bg-appear"
                            style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
                        >
                            <span style={{ color: "white" }} className="mr-1">
                                {album[selectedItem].totalLike}
                            </span>
                            <img
                                src={
                                    album[selectedItem].totalLike === 0
                                        ? heartIcon
                                        : heartIconFill
                                }
                                alt="heart icon"
                                className="w-6 h-6 fill-icon"
                                onClick={() =>
                                    handleLikeImage(
                                        selectedItem,
                                        album[selectedItem]._id
                                    )
                                }
                            />
                        </div>
                        <Carousel
                            showStatus={false}
                            showIndicators={false}
                            showThumbs={false}
                            selectedItem={selectedItem}
                            dynamicHeight={false}
                            showArrows={false}
                        >
                            {album?.map((image, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="gallery-image relative"
                                        onClick={() => showLightbox()}
                                    >
                                        <img
                                            src={image.url}
                                            alt="image gallery"
                                        />
                                    </div>
                                );
                            })}
                        </Carousel>
                    </div>
                    {
                        <FsLightbox
                            toggler={open}
                            sources={urls}
                            sourceIndex={selectedItem}
                        />
                    }
                    <ul className=" gallery-container">
                        {album.map((image, index) => {
                            return (
                                <li
                                    key={index}
                                    className="gallery-img relative"
                                    onClick={() => setSelectedItem(index)}
                                >
                                    <div className="img-container">
                                        <img
                                            src={image.url}
                                            alt="image gallery"
                                        />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    } else {
        return (
            <div
                className="py-10 px-3 section-mb layout-mw gallery-section"
                id="gallery"
            >
                <div className="flex justify-center pb-5">
                    <InvitationLeft />
                    <span className="text-xl pl-1 pr-1 text-center">
                        Our Memories
                    </span>
                    <InvitationRight />
                </div>
                <div className="">
                    <div className="relative">
                        <div
                            className="absolute bottom-8 right-2 w-10 h-6 flex items-center justify-end cursor-pointer rounded-md z-50  bg-bg-appear"
                            style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
                        >
                            <span style={{ color: "white" }} className="mr-1">
                                {album[selectedItem].totalLike}
                            </span>
                            <img
                                src={
                                    album[selectedItem].totalLike === 0
                                        ? heartIcon
                                        : heartIconFill
                                }
                                alt="heart icon"
                                className="w-6 h-6 fill-icon"
                                onClick={() =>
                                    handleLikeImage(
                                        selectedItem,
                                        album[selectedItem]._id
                                    )
                                }
                            />
                        </div>
                        <Carousel
                            showStatus={false}
                            showIndicators={false}
                            showThumbs={false}
                            selectedItem={selectedItem}
                            dynamicHeight={false}
                            showArrows={false}
                        >
                            {album?.map((image, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="gallery-image relative"
                                        onClick={() => showLightbox()}
                                    >
                                        <img
                                            src={image.url}
                                            alt="image gallery"
                                        />
                                    </div>
                                );
                            })}
                        </Carousel>
                    </div>
                    {
                        <FsLightbox
                            toggler={open}
                            sources={urls}
                            sourceIndex={selectedItem}
                        />
                    }
                    <ul className=" gallery-container">
                        {album.map((image, index) => {
                            return (
                                <li
                                    key={index}
                                    className="gallery-img relative"
                                    onClick={() => setSelectedItem(index)}
                                >
                                    <div className="img-container">
                                        <img
                                            src={image.url}
                                            alt="image gallery"
                                        />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
};

export default React.memo(Gallery);
