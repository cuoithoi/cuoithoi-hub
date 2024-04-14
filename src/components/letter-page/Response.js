import React, { useState } from "react";
import background from "../../assets/home-image/time-schedule-bg.png";
import yup from "@/utils/yupGlobal";
import manResponse from "@/assets/svg/man-response.svg";
import womanResponse from "@/assets/svg/woman-response.svg";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Button } from "@/components/button";
import { BUTTON_STYLES } from "@/commons/Constant.ts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { postDataApi } from "@/utils/axios";
import { INVITATION_STYLES } from "@/commons/Constant.ts";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import flower13 from "@/assets/invitation/golden/flower13.svg";
import flower14 from "@/assets/invitation/golden/flower14.svg";
import flower15 from "@/assets/invitation/golden/flower15.svg";
import gradient from "@/assets/invitation/golden/gradient.jpg";

const schema = yup.object().shape({
    nameGuest: yup.string().required("Yêu cầu nhập tên"),
    isVerified: yup.number().required(),
    numberPeopleParticipate: yup.number().required(),
});
const Response = ({ invitationsId, invitationStyle }) => {
    const [guestSide, setGuestSide] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onchange",

        resolver: yupResolver(schema),
    });
    const [numPeopleAttend, setNumberPeopleAttend] = useState(0);
    const [disable, setDisable] = useState(false);
    const increaseNumberPeople = () => {
        setNumberPeopleAttend((prev) => prev + 1);
    };
    const decreaseNumberPeople = () => {
        if (numPeopleAttend === 0) return;
        setNumberPeopleAttend((prev) => prev - 1);
    };
    const onSubmit = (data) => {
        if (!guestSide) {
            toast.error("Vui lòng chọn khách cô dâu hoặc chú rể");
            return;
        }
        if (errors["nameGuest"]) {
            toast.error("Vui lòng điền tên khách mời");
            return;
        }
        if (errors["isVerified"]) {
            toast.error("Vui lòng xác nhận tham dự");
            return;
        }
        if (data["isVerified"] !== 3 && numPeopleAttend === 0) {
            toast.error("Vui lòng chọn số người tham dự");
            return;
        }
        const sendResponse = async () => {
            setDisable(true);
            try {
                const resp = await postDataApi("/send/recurrent-info", {
                    ...data,
                    isGuestSide: guestSide,
                    numberPeopleParticipate: numPeopleAttend,
                    invitationsId: invitationsId,
                });
                if (resp.errorCode === 0) {
                    toast.success(
                        "Gửi phản hồi thành công. Sau 10 giây mới có thể gửi lại"
                    );
                    setTimeout(() => {
                        setDisable(false);
                    }, 10000);
                } else {
                    setTimeout(() => {
                        setDisable(false);
                    }, 10000);
                }
            } catch (error) {
                setDisable(false);
                toast.success(error.message);
            }
        };
        sendResponse();
    };
    if (invitationStyle == INVITATION_STYLES.GOLDEN) {
        return (
            <div
                className="layout-mw section-mb relative pb-10 pt-28 text-center bg-[#FAF9F5]"
            >
                <img className="absolute right-0 top-0 w-1/5" src={flower13} />
                <h2 className="text-3xl font-[SFUTrajanRegular] text-[#7F4E26]">Thông tin phản hồi</h2>
                <p className="font-[RokkittExtraLight] text-[#808080] max-w-sm margin-auto pb-6">
                    Để thuận tiện cho việc sắp xếp chỗ ngồi, <br />
                    vui lòng phản hồi giúp gia đình chúng tôi!
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between gap-10 pb-10 max-w-sm margin-auto">
                        <div
                            className={`text-center  rounded-lg shadow side-choose ${
                                guestSide === 1 ? "bg-letter-main-color" : ""
                            }`}
                            onClick={() => setGuestSide(1)}
                        >
                            <div className="py-4 px-6">
                                <img
                                    src={manResponse}
                                    alt="man response"
                                    className="margin-auto pb-2"
                                />
                                <p
                                    className="m-0 font-[MavenPro] text-[#808080]"
                                >
                                    Khách nhà trai
                                </p>
                            </div>
                        </div>
                        <div
                            className={`text-center rounded-lg shadow side-choose ${
                                guestSide === 2 ? "bg-letter-main-color" : ""
                            }`}
                            onClick={() => setGuestSide(2)}
                        >
                            <div className="py-4 px-6 ">
                                <img
                                    src={womanResponse}
                                    alt="man response"
                                    className="margin-auto pb-2 "
                                />
                                <p
                                    className="m-0 font-[MavenPro] text-[#808080]"
                                >
                                    Khách nhà gái
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="font-[RokkittExtraLight] text-[#808080]">Tên khách mời</p>
                    <div className="max-w-sm margin-auto">
                        <input
                            type="text"
                            className="input-letter text-center shadow rounded-lg mb-4 w-full"
                            name="nameGuest"
                            {...register("nameGuest")}
                        />
                        <div className="flex items-center justify-between max-w-sm margin-auto font-[MavenPro] text-[#808080]">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="able-attend"
                                    value={1}
                                    id="response-attend"
                                    {...register("isVerified")}
                                />
                                <label
                                    className="ml-2"
                                    htmlFor="response-attend"
                                >
                                    Tham dự
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="maybe-attend"
                                    value={2}
                                    id="response-maybe"
                                    {...register("isVerified")}
                                />
                                <label
                                    className="ml-2"
                                    htmlFor="response-maybe"
                                >
                                    Có thể
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="cannot-attend"
                                    id="response-cannot"
                                    value={3}
                                    {...register("isVerified")}
                                />
                                <label
                                    className="ml-2"
                                    htmlFor="response-cannot"
                                >
                                    Rất tiếc
                                </label>
                            </div>
                        </div>
                    </div>
                    <p className="pt-6 font-[RokkittExtraLight] text-[#808080]">Số người tham dự</p>
                    <div className="flex items-center justify-center">
                        <span
                            className="text-4xl  cursor-pointer"
                            onClick={decreaseNumberPeople}
                        >
                            <FaChevronLeft size={24} color="#AD8955" />
                        </span>
                        <input
                            type="number"
                            name="number-attend"
                            className="px-8 mx-4 font-[NexaBold] text-[#808080] input-count-num mx-2 text-text shadow rounded-lg input-letter"
                            value={numPeopleAttend}
                            style={{ width: "160px" }}
                            {...register("numberPeopleParticipate")}
                        />
                        <span
                            className="text-4xl  pointer cursor-pointer"
                            onClick={increaseNumberPeople}
                        >
                            <FaChevronRight size={24} color="#AD8955" />
                        </span>
                    </div>
                    <div className="w-[160px] margin-auto pt-6">
                        <Button
                            type="submit"
                            buttonStyle={BUTTON_STYLES.PASTEL_PINK}
                            textStyle={BUTTON_STYLES.WHITE}
                            label="Xác nhận"
                            backgroundImageUrl={gradient}
                            width="100"
                            disabled={disable}
                        />
                    </div>
                </form>
                <img className="absolute left-0 bottom-0 w-1/5" src={flower14} />
                <img className="absolute right-0 bottom-0 w-1/5" src={flower15} />
            </div>
        );
    } else if (invitationStyle == INVITATION_STYLES.PINK) {
        return (
            <div
                className="layout-mw section-mb py-10 text-center"
            >
                <h2 className="font-[NexaBold] text-3xl p-10 text-[#F9959D]">Thông tin phản hồi</h2>
                <p className="font-[MavenPro] text-[#808080] max-w-sm margin-auto pb-20">
                    Để thuận tiện cho việc sắp xếp chỗ ngồi, <br />
                    vui lòng phản hồi giúp gia đình chúng tôi!
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between gap-10 pb-10 max-w-sm margin-auto">
                        <div
                            className={`text-center  rounded-lg shadow side-choose ${
                                guestSide === 1 ? "bg-letter-main-color" : ""
                            }`}
                            onClick={() => setGuestSide(1)}
                        >
                            <div className="py-4 px-6">
                                <img
                                    src={manResponse}
                                    alt="man response"
                                    className="margin-auto pb-2"
                                />
                                <p
                                    className="m-0 font-[MavenPro] text-[#808080]"
                                >
                                    Khách nhà trai
                                </p>
                            </div>
                        </div>
                        <div
                            className={`text-center rounded-lg shadow side-choose ${
                                guestSide === 2 ? "bg-letter-main-color" : ""
                            }`}
                            onClick={() => setGuestSide(2)}
                        >
                            <div className="py-4 px-6 ">
                                <img
                                    src={womanResponse}
                                    alt="man response"
                                    className="margin-auto pb-2 "
                                />
                                <p
                                    className="m-0 font-[MavenPro] text-[#808080]"
                                >
                                    Khách nhà gái
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="font-[MavenPro] text-[#808080]">Tên khách mời</p>
                    <div className="max-w-sm margin-auto">
                        <input
                            type="text"
                            className="input-letter text-center shadow rounded-lg mb-4 w-full"
                            name="nameGuest"
                            {...register("nameGuest")}
                        />
                        <div className="flex items-center justify-between max-w-sm margin-auto font-[MavenPro] text-[#808080]">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="able-attend"
                                    value={1}
                                    id="response-attend"
                                    {...register("isVerified")}
                                />
                                <label
                                    className="ml-2"
                                    htmlFor="response-attend"
                                >
                                    Tham dự
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="maybe-attend"
                                    value={2}
                                    id="response-maybe"
                                    {...register("isVerified")}
                                />
                                <label
                                    className="ml-2"
                                    htmlFor="response-maybe"
                                >
                                    Có thể
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="cannot-attend"
                                    id="response-cannot"
                                    value={3}
                                    {...register("isVerified")}
                                />
                                <label
                                    className="ml-2"
                                    htmlFor="response-cannot"
                                >
                                    Rất tiếc
                                </label>
                            </div>
                        </div>
                    </div>
                    <p className="pt-6 font-[MavenPro] text-[#808080]">Số người tham dự</p>
                    <div className="flex items-center justify-center">
                        <span
                            className="text-4xl  cursor-pointer"
                            onClick={decreaseNumberPeople}
                        >
                            <FaChevronLeft size={24} color="#FFD6D1" />
                        </span>
                        <input
                            type="number"
                            name="number-attend"
                            className="px-8 mx-4 font-[NexaBold] text-[#808080] input-count-num mx-2 text-text shadow rounded-lg input-letter"
                            value={numPeopleAttend}
                            style={{ width: "160px" }}
                            {...register("numberPeopleParticipate")}
                        />
                        <span
                            className="text-4xl  pointer cursor-pointer"
                            onClick={increaseNumberPeople}
                        >
                            <FaChevronRight size={24} color="#FFD6D1" />
                        </span>
                    </div>
                    <div className="inline-block margin-auto pt-6 w-[160px]">
                        <Button
                            type="submit"
                            buttonStyle={BUTTON_STYLES.LIGHT_PASTEL_PINK}
                            textStyle={BUTTON_STYLES.WHITE}
                            label="Xác nhận"
                            width="100"
                            disabled={disable}
                        />
                    </div>
                </form>
            </div>
        );
    } else {
        return (
            <div
                className="layout-mw section-mb py-10 text-center"
                style={{ backgroundImage: `url(${background})` }}
            >
                <h2 className="text-main">Thông tin phản hồi</h2>
                <p className="max-w-sm margin-auto pb-6">
                    Để thuận tiện cho việc sắp xếp chỗ ngồi, <br />
                    vui lòng phản hồi giúp gia đình chúng tôi!
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between gap-10 pb-10 max-w-sm margin-auto">
                        <div
                            className={`text-center  rounded-lg border-gray-item-color side-choose ${
                                guestSide === 1 ? "bg-letter-main-color" : ""
                            }`}
                            onClick={() => setGuestSide(1)}
                        >
                            <div className="py-4 px-6">
                                <img
                                    src={manResponse}
                                    alt="man response"
                                    className="margin-auto pb-2"
                                />
                                <p
                                    className="text-white m-0"
                                    style={
                                        guestSide === 1
                                            ? { color: "white" }
                                            : { color: "black" }
                                    }
                                >
                                    Khách nhà trai
                                </p>
                            </div>
                        </div>
                        <div
                            className={`text-center rounded-lg border-gray-item-color side-choose ${
                                guestSide === 2 ? "bg-letter-main-color" : ""
                            }`}
                            onClick={() => setGuestSide(2)}
                        >
                            <div className="py-4 px-6 ">
                                <img
                                    src={womanResponse}
                                    alt="man response"
                                    className="margin-auto pb-2 "
                                />
                                <p
                                    className="text-white m-0"
                                    style={
                                        guestSide === 2
                                            ? { color: "white" }
                                            : { color: "black" }
                                    }
                                >
                                    Khách nhà gái
                                </p>
                            </div>
                        </div>
                    </div>
                    <p>Tên khách mời</p>
                    <div className="max-w-sm margin-auto">
                        <input
                            type="text"
                            className="input-letter text-center border-gray-item-color rounded-lg mb-4 w-full"
                            name="nameGuest"
                            {...register("nameGuest")}
                        />
                        <div className="flex items-center justify-between max-w-sm margin-auto">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="able-attend"
                                    value={1}
                                    id="response-attend"
                                    {...register("isVerified")}
                                />
                                <label
                                    className="ml-2"
                                    htmlFor="response-attend"
                                >
                                    Tham dự
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="maybe-attend"
                                    value={2}
                                    id="response-maybe"
                                    {...register("isVerified")}
                                />
                                <label
                                    className="ml-2"
                                    htmlFor="response-maybe"
                                >
                                    Có thể
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="cannot-attend"
                                    id="response-cannot"
                                    value={3}
                                    {...register("isVerified")}
                                />
                                <label
                                    className="ml-2"
                                    htmlFor="response-cannot"
                                >
                                    Rất tiếc
                                </label>
                            </div>
                        </div>
                    </div>
                    <p className="pt-6">Số người tham dự</p>
                    <div className="flex items-center justify-center">
                        <span
                            className="text-4xl  cursor-pointer"
                            onClick={decreaseNumberPeople}
                        >
                            <AiOutlineMinus />
                        </span>
                        <input
                            type="number"
                            name="number-attend"
                            className="input-count-num mx-2 text-text border-gray-item-color rounded-lg input-letter"
                            value={numPeopleAttend}
                            style={{ width: "56px" }}
                            {...register("numberPeopleParticipate")}
                        />
                        <span
                            className="text-4xl  pointer cursor-pointer"
                            onClick={increaseNumberPeople}
                        >
                            <AiOutlinePlus />
                        </span>
                    </div>
                    <div className="max-w-sm margin-auto pt-6">
                        <Button
                            type="submit"
                            buttonStyle={BUTTON_STYLES.LIGHT_BLUE}
                            label="Xác nhận"
                            rounded={true}
                            width="100"
                            disabled={disable}
                        />
                    </div>
                </form>
            </div>
        );
    }
};

export default React.memo(Response);
