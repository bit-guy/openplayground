import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleSelectModel(modelState, modelsStateContext, setModelsStateContext, parametersContext, setParametersContext, multi_select: boolean) {
  const number_of_models_selected = modelsStateContext.filter(modelState => modelState.selected).length
  const selected = (!multi_select && number_of_models_selected > 1) ? true : !modelState.selected

  if (selected && !multi_select) {
    const parameters = modelState.parameters

    setParametersContext({
      ...parametersContext,
      temperature: parameters.temperature || parametersContext.temperature,
      maximumLength: parameters.maximumLength || parametersContext.maximumLength,
      topP: parameters.topP || parametersContext.topP,
      topK: parameters.topK || parametersContext.topK,
      frequencyPenalty: parameters.frequencyPenalty || parametersContext.frequencyPenalty,
      presencePenalty: parameters.presencePenalty || parametersContext.presencePenalty,
      repetitionPenalty: parameters.repetitionPenalty || parametersContext.repetitionPenalty,
      stopSequences: parameters.stopSequences || parametersContext.stopSequences
    })
  }

  setModelsStateContext(
    modelsStateContext.map((m) => {
      if (!multi_select && m.tag !== modelState.tag) {
        m.selected = false
      } else if (m.tag === modelState.tag) {
        m.selected = selected
      }
      return m
    })
  )

  console.log("Model state context: ", modelsStateContext)
  console.log("Parameters context: ", parametersContext)
}