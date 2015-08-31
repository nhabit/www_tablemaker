defmodule WwwTablemaker.TablemakerChannel do
  use Phoenix.Channel
  require Logger
  import ExUnit.CaptureIO


  def join("maketable:", auth_msg, socket) do
    {:ok, socket}
  end

 
  def handle_in("maketable", %{"type" => type, "count" => count}, socket) do
    table = capture_io fn -> Tablemaker.run([type: type, count: String.to_integer(count)]) end
    push socket, "drawtable", %{table: table}
    {:noreply, socket}
  end

  def handle_out("new_msg", payload, socket) do
    push socket, "new_msg", payload
    {:noreply, socket}
  end
 # def handle_info({:currenttime, tz}, socket) do
 #   date = Date.local
 #   |> Timezone.convert(Timezone.get(tz))
 #   %{:hour => hour, :minute => minute, :second => second} = date

 #   push socket, "table:update", %{hours: hour, mins: minute, secs: second, tz: tz}
 #   {:noreply, socket}
 # end

  def terminate(reason, socket) do
    Logger.debug"> leave #{inspect reason}"
    :ok
  end
end