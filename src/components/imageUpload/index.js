import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import ImageUploading from "react-images-uploading";
import CloseIcon from "../icons/CloseIcon";
import SortableList, { SortableItem } from "react-easy-sort";
import Validate from "@/utils/Validate";
import { isArray } from "lodash";
import { fiedlsCreatePage } from "@/commons/FieldsDataObj";
import { APi, config } from '@/commons/Constant.ts'
import { useBaseService } from '@/utils/BaseServices'
import { toast } from "react-toastify";
import { FaTruckLoading } from "react-icons/fa";

export const ImageUpload = forwardRef(
  ({ images, title, icon, maxW, height, desc, maxnumber, allowDrag, onChange, onSortEnd, urlLocal, idCreateRespon, maxFileSize, loading }, ref) => {
    useImperativeHandle(ref, () => ({
      setErrorMsg
    }));

    const [errMsg, setErrMsg] = useState("");

    const [values] = useState(fiedlsCreatePage)

    const [checkUrlLocal, setCheckurlLocal] = useState(false);

    const [albumList, setAlbumList] = useState(urlLocal ? urlLocal : [])

    const maxNumber = maxnumber || 10;

    const { post } = useBaseService()

    //function sort and updatelist => call out component
    // const onChange = (imageList) => {
    //   setImages(imageList);
    // };

    // const onSortEnd = useCallback((oldIndex, newIndex) => {
    //   setImages((array) => arrayMove(array, oldIndex, newIndex));
    // }, []);

    useEffect(() => {

      if (urlLocal?.length === 0 || urlLocal === '' || urlLocal === undefined) {
        setCheckurlLocal(!checkUrlLocal)
      } else setCheckurlLocal(checkUrlLocal)

    }, [])

    const onError = () => {
      toast.warning('Vượt quá số lượng ảnh cho phép', {
        autoClose: 1000
      })
    };

    const setErrorMsg = useCallback((msg) => {
      if (Validate.isEmptyValue(msg)) {
        return;
      }
      setErrMsg(msg);
    }, []);

    const errorMessage = useMemo(() => {
      if (!Validate.isEmptyValue(errMsg)) {
        return (
          <div className='messageError'>
            <p>{errMsg}</p>
          </div>
        );
      }
      return null;
    }, [errMsg]);

    const onRemove = useCallback(() => {
      setCheckurlLocal(true)
      values.album = []
    }, [checkUrlLocal])

    const onRemoveAlnum = async (itemUrl) => {

      const newAlbum = [...albumList];
      newAlbum.splice(itemUrl, 1);
      setAlbumList(newAlbum);

      const dataUpdate = Object.assign({
        "_id": idCreateRespon,
        "album": newAlbum
      })

      const responseupdate = await post(APi.updateInvitation, dataUpdate, config);
      if (responseupdate.errorCode == 0) {
        values.album = responseupdate.data?.album
      }
    }

    return (
      <div className="wrap_box_upload_image_section">
        {
          checkUrlLocal &&
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            acceptType={["jpg", "png", "jpeg", "bmp", ".gif", "HEIC"]}
            onError={onError}
            maxFileSize={maxFileSize}
          >
            {({

              imageList,
              onImageUpload,
              onImageUpdate,
              onImageRemove,
              dragProps,

            }) => (
              // write your building UI
              <div className="wrap_box_upload_image_child">
                <SortableList
                  onSortEnd={onSortEnd}
                  className={'root-remove'}
                  draggedItemClassName={'dragged'}
                  defaultChecked
                  draggable
                  hidden
                  allowDrag={allowDrag || false}
                  style={{ width: maxW }}
                >
                  {
                    imageList.map((image, index) =>
                      <SortableItem key={index} imgProps={{ draggable: false }}>
                        <div className="image-item flex justify-center" >
                          <div
                            className="relative"
                            style={{ height: height }}
                            {...dragProps}
                          >
                            <div
                              className="absolute pointer"
                              onClick={() => onImageRemove(index)}
                            >
                              <CloseIcon />
                            </div>
                            <img
                              src={image.data_url}
                              alt={'thumbs' + image.file?.size}
                              onClick={() => onImageUpdate(index)}
                              style={{ height: height }}
                            />

                            {
                              loading && <div className="loading_image"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
                            }

                          </div>
                        </div>
                      </SortableItem>
                    )
                  }
                  {
                    images.length < maxNumber && <div
                      className="wrap_imageUploading border-img-dash flex items-center"
                      style={{ maxWidth: maxW, height: height }}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      <div className="justify-center">
                        <div className='ImgUploadIcon'>
                          {icon}
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="add_image_uploading">
                          {title}
                        </p>
                        {desc && <p className="desc_image_uploading">{desc}</p>}
                      </div>
                      {errorMessage}
                    </div>
                  }
                </SortableList>
              </div>
            )}
          </ImageUploading>
        }
        {
          !checkUrlLocal && <div className="image-item flex " style={{ gap: 20, flexWrap: 'wrap' }}>
            {
              !isArray(urlLocal) &&
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <div
                  className="relative"
                  style={{ height: height }}

                >
                  <div
                    className="absolute pointer"
                    onClick={onRemove}
                  >
                    <CloseIcon />
                  </div>
                  <img
                    src={urlLocal}
                    alt={'thumbs'}

                    style={{ height: height }}
                  />
                  {
                    loading && <div className="loading_image"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
                  }
                </div></div>
              || isArray(urlLocal) && <> {
                albumList.map((image, index) =>
                  <div
                    className="relative max-w-fit"
                    style={{ height: height }}
                    key={index}
                  >
                    <div
                      className="absolute pointer"
                      onClick={() => onRemoveAlnum(image)}
                    >
                      <CloseIcon />
                    </div>
                    <img
                      src={image}
                      alt={'thumbs' + image.file?.size}
                      style={{ height: height }}
                    />
                    {
                      loading && <div className="loading_image"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
                    }
                  </div>
                )}
                <ImageUploading
                  multiple
                  value={images}
                  onChange={onChange}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                  acceptType={["jpg", "png", "jpeg", "bmp", ".gif", "HEIC"]}
                  onError={onError}
                  maxFileSize={maxFileSize}
                >
                  {({

                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    onImageRemove,
                    dragProps,

                  }) => (
                    // write your building UI
                    <div className="wrap_box_upload_image_child">
                      <SortableList
                        onSortEnd={onSortEnd}
                        className={'root-remove'}
                        draggedItemClassName={'dragged'}
                        defaultChecked
                        draggable
                        hidden
                        allowDrag={allowDrag || false}
                        style={{ width: maxW }}
                      >
                        {
                          imageList.map((image, index) =>
                            <SortableItem key={index} imgProps={{ draggable: false }}>
                              <div className="image-item flex justify-center" >
                                <div
                                  className="relative max-w-fit"
                                  style={{ height: height }}
                                  {...dragProps}
                                >
                                  <div
                                    className="absolute pointer"
                                    onClick={() => onImageRemove(index)}
                                  >
                                    <CloseIcon />
                                  </div>
                                  <img
                                    src={image.data_url}
                                    alt={'thumbs' + image.file?.size}
                                    onClick={() => onImageUpdate(index)}
                                    style={{ height: height }}
                                  />
                                  {
                                    loading && <div className="loading_image"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
                                  }
                                </div>
                              </div>
                            </SortableItem>
                          )
                        }
                        {
                          images.length < maxNumber && <div
                            className="wrap_imageUploading border-img-dash flex items-center"
                            style={{ maxWidth: maxW, height: height }}
                            onClick={onImageUpload}
                            {...dragProps}
                          >
                            <div className="justify-center">
                              <div className='ImgUploadIcon'>
                                {icon}
                              </div>
                            </div>
                            <div className="text-center">
                              <p className="add_image_uploading">
                                {title}
                              </p>
                              {desc && <p className="desc_image_uploading">{desc}</p>}
                            </div>
                            {errorMessage}
                          </div>
                        }
                      </SortableList>
                    </div>
                  )}
                </ImageUploading>
              </>
            }
          </div>
        }

      </div>
    );
  });
