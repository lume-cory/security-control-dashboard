import * as SubframeCore from '@subframe/core'
import { Button } from "@/subframe/components/Button"
import { Dispatch, SetStateAction } from 'react';

type FeatherIcon = 'FeatherFile' | 'FeatherSlack' | 'FeatherTicket';

type Integration = {
  name: string;
  link: string;
  icon: FeatherIcon;
  subtitle: string;
}

type IntegrationAndDataSourcesProps = {
  integrations: Integration[];
  addIntegration: () => {};
}

export default function IntegrationsAndDataSources({
  integrations,
  addIntegration
}: IntegrationAndDataSourcesProps) {

  return (
    < div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm" >
      <div className="flex w-full items-center gap-2" >
        <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font" >
          Integrations and Data Sources
        </span>
        <Button
          className="h-6 w-auto flex-none"
          disabled={false}
          variant="brand-primary"
          icon="FeatherPlus"
          loading={false}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => { addIntegration(); }
          }
        >
          Add
        </Button>
      </div>
      < div className="grid w-full grid-cols-3 items-start gap-4" >
        {integrations.map(({ name, link, subtitle, icon }, i) => {
          return (
            <a key={`${name}-${i}`} href={link} target="_blank">
              <div className="flex items-center gap-2 rounded-md bg-neutral-50 px-2 py-2">
                <SubframeCore.Icon
                  className="text-heading-2 font-heading-2 text-default-font"
                  name={icon}
                />
                <div className="flex flex-col items-start gap-2 px-1" >
                  <span className="text-body-bold font-body-bold text-default-font" >
                    {name}
                  </span>
                  {subtitle &&
                    < span className="text-caption font-caption text-default-font" >
                      {subtitle}
                    </span>
                  }
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </div>)
}