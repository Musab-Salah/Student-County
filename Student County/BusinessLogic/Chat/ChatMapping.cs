using Student_County.DAL;

namespace Student_County.BusinessLogic.Chat
{
    public static class DestinationMapping
    {
        public static ChatEntity? MapBoToEntity(this DestinationBo bo)
        {
            if (bo == null) return null;
            return new ChatEntity
            {
                Id = bo.Id,
                From = bo.From,
                To = bo.To,
                Message = bo.Message,                
            };
        }
    }
}
