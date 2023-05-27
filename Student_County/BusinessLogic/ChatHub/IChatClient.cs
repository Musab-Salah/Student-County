namespace Student_County.BusinessLogic.Hubs
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);

    }
}
