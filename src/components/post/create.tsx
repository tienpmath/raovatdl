"user client";
import { addQuery } from "@/app/actions/AddQuery";
import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import axios from "axios";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];
const CreatePostComponent = (prop: any) => {
  //console.log(prop);
  const [data, setData] = useState();
  const receivedDataHandler = (data: any) => {
    setData(data);
  };
  const [file, setFile] = useState(null);
  const [urlImage, setUrlImages] = useState("");

  const handleChange = async (file: any) => {
    setFile(file);
    const formData = new FormData();
    var i = 0;
    for (const uploadedFile of file) {
      //make a bew FormData for every file.
      formData.append("ImageFile", file[i]);
      i++;
    }
    //console.log(formData)
    try {
      const res = await axios.post(
        "https://file.raovatlamdong.vn/addImages",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      setUrlImages(res.data);

      //props.sendDataToParent(res)
    } catch (ex) {
      console.log(ex);
    }
  };
  //const [dataUser, setDataUser] = useState<ApplicationConfigurationDto>()
  useEffect(() => {
    (async () => {
      // const appConfig = await abpApplicationConfigurationGet();
      // setDataUser(appConfig);
    })();
  }, []);
  // console.log(useCurrentUser)

  return (
    <>
      {1 ? (
        <div>
          <div className="mb-5">
            <pre>{JSON.stringify(prop.info.user, null, 2)}</pre>
          </div>
          <hr />
          <FileUploader
            label="Upload hình ảnh ! Tối đa 5 hình"
            active="true"
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            multiple={true}
            onSizeError="false"
            onTypeError="false"
          />
          <h2>Các file Ảnh đã Upload: {urlImage}</h2>
          <hr />
          <form className="space-y-8" action={addQuery} method="POST">
            <div className="grid gap-5 sm:grid-cols-2">
              <Select name="categoryId">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">Bất động sản</SelectItem>
                    <SelectItem value="2">Xe Ô tô, Xe máy</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select name="locationId">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn Khu vực" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Lâm Đồng</SelectLabel>
                    <SelectItem value="1">TP Đà Lạt</SelectItem>
                    <SelectItem value="apple">Đức Trọng</SelectItem>
                    <SelectItem value="banana">Lâm Hà</SelectItem>
                    <SelectItem value="blueberry">Di Linh</SelectItem>
                    <SelectItem value="grapes">Bảo Lộc</SelectItem>
                    <SelectItem value="pineapple">Bảo Lâm</SelectItem>
                    <SelectLabel>Tỉnh khác</SelectLabel>
                    <SelectItem value="apple">TP Hồ Chí Minh</SelectItem>
                    <SelectItem value="apple">TP Hà Nội</SelectItem>
                    <SelectItem value="apple">Tỉnh khác</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Nhập tiêu đề *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                defaultValue=""
                required
                placeholder="Tiêu đề"
              />
            </div>{" "}
            <div className="grid w-full items-center gap-1.5">
              {" "}
              <Label>Nhập mô tả chi tiết * </Label>
              <Textarea
                id="description"
                name="description"
                defaultValue=""
                required
                placeholder="Mô tả"
              />{" "}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Nhập giá * | Nhập 0 là thương lượng giá</Label>
              <Input
                id="price"
                type="number"
                name="price"
                defaultValue="0"
                required
                placeholder="giá"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Nhập số điện thoại * </Label>
              <Input
                id="phone"
                type="number"
                name="phone"
                defaultValue={0}
                required
                placeholder="Số điện thoại"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Nhập địa chỉ liên hệ * </Label>
              <Input
                id="address"
                type="text"
                defaultValue=""
                required
                name="address"
                placeholder="Địa chỉ liên hệ * "
              />{" "}
            </div>
            <Input
              id="seller"
              type="hidden"
              name="seller"
              value={prop.info.user.sub}
              required
              readOnly
              placeholder="Người bán"
            />
            <Input
              id="Email"
              type="hidden"
              name="Email"
              value={prop.info.user.email}
              required
              readOnly
              placeholder="Email"
            />
            <Input id="image" name="image" type="hidden" value={urlImage} />
            <Button type="submit">Đăng bài ngay - Miễn phí !</Button>
          </form>
        </div>
      ) : (
        <h2>Bạn chưa đăng nhập ? vui lòng đăng nhập nhé</h2>
      )}
    </>
  );
};

export default CreatePostComponent;
