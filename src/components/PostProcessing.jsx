import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Effects } from "@react-three/drei";

function PostProcessing() {
  const { scene, camera } = useThree();
  const {saoBias, saoIntensity, saoScale, saoKernelRadius, saoMinResolution, saoBlur, saoBlurRadius, saoBlurStdDev, saoBlurDepthCutoff } = useControls("SAO Pass",{
    saoBias: {value: 0.06, min: 0, max: 2 },
    saoIntensity: {value: 0.02, min: 0, max: 2 },
    saoScale: {value: 100, min: 0, max:100 },
    saoKernelRadius: {value: 27, min: 0, max:100 },
    saoMinResolution: {value: 0.00001, min: 0, max:2 },
    saoBlur: true,
    saoBlurRadius: {value: 4, min: 0, max:200 },
    saoBlurStdDev: {value: 2, min: 0, max:200 },
    saoBlurDepthCutoff:{value: 0.65, min: 0, max:5 },
  });

  return (
    <>
      <Effects multisamping={8} renderIndex={10} disableGamma={false} disableRenderPass={false} disableRender={false}>
        <sAOPass args={[scene, camera]} params={{
          output:  0,
          saoBias: saoBias,
          saoIntensity: saoIntensity,
          saoScale: saoScale,
          saoKernelRadius:saoKernelRadius,
          saoMinResolution:saoMinResolution,
          saoBlur: saoBlur,
          saoBlurRadius: saoBlurRadius,
          saoBlurStdDev: saoBlurStdDev,
          saoBlurDepthCutoff: saoBlurDepthCutoff,
        }}/>
      </Effects>
    </>
  )
}

export default PostProcessing;