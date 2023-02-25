using Student_County.DAL;

namespace Student_County.BusinessLogic.Chat
{
    public interface IChatManager
    {
        Task<List<ChatEntity>> GetAll();
        Task<ChatEntity> Delete(int id);
        Task<ChatEntity> GetChat(int id);
        Task<ChatEntity> CreateUpdate(ChatBo bo, int id = 0);
    }
}
