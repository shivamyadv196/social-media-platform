import React, { useRef, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { readFileAsDataURL } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((store) => store.auth);

  const resetForm = () => {
    setFile(null);
    setCaption("");
    setImagePreview("");
  };

  const handleClose = (state) => {
    setOpen(state);
    if (!state) resetForm();
  };

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async () => {
    const formData = new FormData();
    formData.append("caption", caption);
    if (file) formData.append("image", file);

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/post/addpost`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        handleClose(false); // close + reset
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>

        <DialogHeader className="text-center font-semibold">
          Create New Post
        </DialogHeader>

        {/* USER INFO */}
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-xs">
              {user?.username}
            </h1>
          </div>
        </div>

        {/* CAPTION */}
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border-none focus-visible:ring-transparent"
          placeholder="Write a caption..."
        />

        {/* IMAGE PREVIEW */}
        {imagePreview && (
          <img
            src={imagePreview}
            className="w-full h-64 object-cover rounded-md"
          />
        )}

        {/* FILE INPUT */}
        <input
          ref={imageRef}
          type="file"
          className="hidden"
          onChange={fileChangeHandler}
        />

        <Button
          onClick={() => imageRef.current.click()}
          className="w-fit mx-auto"
        >
          Select from computer
        </Button>

        {/* POST BUTTON */}
        {imagePreview && (
          loading ? (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting...
            </Button>
          ) : (
            <Button onClick={createPostHandler} className="w-full">
              Post
            </Button>
          )
        )}

      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;