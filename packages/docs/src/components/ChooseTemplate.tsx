import React, { useCallback, useState } from "react";
import { CreateVideoInternals, Template } from "create-video";
import { TemplateModal } from "./TemplateModal";
import { Blank } from "../pages/icons/blank";
import { Cubes } from "../pages/icons/cubes";
import { JSIcon } from "../pages/icons/js";
import { StillIcon } from "../pages/icons/still";
import { TypeScriptIcon } from "../pages/icons/ts";
import { TTSIcon } from "../pages/icons/tts";
import { Waveform } from "../pages/icons/waveform";
import { TemplateIcon } from "../pages/template-icon";

const IconForTemplate: React.FC<{
  template: Template;
}> = ({ template }) => {
  if (template.homePageLabel === "TypeScript") {
    return (
      <TypeScriptIcon
        style={{
          height: 48,
        }}
      ></TypeScriptIcon>
    );
  }

  if (template.homePageLabel === "Blank") {
    return (
      <Blank
        style={{
          height: 36,
        }}
      ></Blank>
    );
  }

  if (template.homePageLabel === "JavaScript") {
    return (
      <JSIcon
        style={{
          height: 40,
        }}
      ></JSIcon>
    );
  }
  if (template.homePageLabel === "3D") {
    return (
      <Cubes
        style={{
          height: 36,
        }}
      ></Cubes>
    );
  }

  if (template.homePageLabel === "Stills") {
    return (
      <StillIcon
        style={{
          height: 36,
        }}
      ></StillIcon>
    );
  }

  if (template.homePageLabel === "Audiogram") {
    return (
      <Waveform
        style={{
          height: 36,
        }}
      ></Waveform>
    );
  }
  if (template.homePageLabel === "TTS") {
    return (
      <TTSIcon
        style={{
          height: 36,
        }}
      ></TTSIcon>
    );
  }

  return (
    <Blank
      style={{
        height: 40,
      }}
    ></Blank>
  );
};

export const ChooseTemplate: React.FC = () => {
  const [modal, setModal] = useState<Template | null>(null);

  const onClick = useCallback((template: Template) => {
    setModal(template);
  }, []);

  const onDismiss = useCallback(() => {
    setModal(null);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {modal ? (
        <TemplateModal
          selectedTemplate={modal}
          onDismiss={onDismiss}
        ></TemplateModal>
      ) : null}
      <div style={{ flex: 1 }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {CreateVideoInternals.FEATURED_TEMPLATES.map((template) => {
          return (
            <TemplateIcon
              onClick={() => onClick(template)}
              label={template.homePageLabel}
            >
              <IconForTemplate template={template} />
            </TemplateIcon>
          );
        })}
      </div>
    </div>
  );
};
