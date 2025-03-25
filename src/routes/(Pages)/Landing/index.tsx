import ButtonSparkle from "~/components/Buttons/AnimatedIconButton/ButtonSparkle";
import { onCleanup, onMount } from "solid-js";
import { setShowMenu } from "~/components/Menus/Menu";
import Card from "./components/Card";
import Background from "./components/Background";
import Title from "~/components/Title";
import { A, Navigate, useNavigate } from "@solidjs/router";

export default function Index() {
  onMount(() => {
    setShowMenu(false);
  });
  onCleanup(() => {
    setShowMenu(true);
  });
  const navigate = useNavigate();
  return (
    <>
      <Background />
      <div class="w-64 mx-auto">
        <Title title="PULSIX" />
      </div>
      <div class="flex flex-col items-center justify-center mt-250 pb-100 pt-10">
        <ButtonSparkle
          text="Get started"
          shadow={40}
          onClick={() => navigate("/LoginRegistration")}
        />
      </div>

      <div class="flex justify-center items-center min-h-screen gap-4">
  <div class="w-1/4 p-4">
    <Card
      title="dio lebbroso"
      description="coglione"
      logo={
        <svg
          fill="currentColor"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          height="1em"
          width="1em"
          style="overflow: visible; color: white;"
        >
          <path d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM305.8 637.7c3.1 3.1 8.1 3.1 11.3 0l138.3-137.6L583 628.5c3.1 3.1 8.2 3.1 11.3 0l275.4-275.3c3.1-3.1 3.1-8.2 0-11.3l-39.6-39.6a8.03 8.03 0 0 0-11.3 0l-230 229.9L461.4 404a8.03 8.03 0 0 0-11.3 0L266.3 586.7a8.03 8.03 0 0 0 0 11.3l39.5 39.7z"></path>
        </svg>
      }
    />
  </div>

  <div class="w-1/4 p-4">
    <Card title="prova" description="coglione" />
  </div>

  <div class="w-1/4 p-4">
    <Card title="prova" description="coglione" />
  </div>
</div>

    </>
  );
}
